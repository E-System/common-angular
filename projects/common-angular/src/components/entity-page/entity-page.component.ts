import {Component, EventEmitter, OnInit} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {DTOPagerResponse} from '../../models/dtopager-response';
import {EntityService} from '../../services/entity/entity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KeyValue} from '@angular/common';
import {debounceTime, delayWhen, throttleTime} from 'rxjs/operators';
import {TableColumn} from '../../models/table-column';

@Component({
  template: ''
})
export abstract class EntityPageComponent<T> implements OnInit {

  page = 1;
  cols: TableColumn[] = [];
  pager: DTOPagerResponse<T>;
  filter: any = {};
  filterApplyEmitter = new EventEmitter<number>();
  showFilter = false;
  isLoading = false;
  delay = 0;
  useSkeleton = true;

  protected constructor(private readonly entityService: EntityService<T>,
                        protected readonly router: Router,
                        protected readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cols = this.buildCols();
    const pageParam = this.route.snapshot.queryParams.page;
    if (pageParam && pageParam > 0) {
      this.page = pageParam;
    } else {
      this.page = 1;
    }
  }

  update(page: number, params?: KeyValue<string, string>[]) {
    this.page = page;
    if (this.useSkeleton) {
      this.pager.data = Array(this.pager?.pager?.pageSize ? this.pager?.pager?.pageSize : 10).fill({});
    }
    this.isLoading = true;
    this.entityService.getPage(page, params)
      .pipe(delayWhen(() => this.delayRequest(Date.now())))
      .subscribe({
        next: (pager: any) => {
          this.pager = pager;
          this.isLoading = false;
        }, error: (error) => {
          console.log(error);
          this.isLoading = false;
          if (this.useSkeleton) {
            this.pager.data = [];
          }
        }
      });
  }

  private delayRequest(startTime: number) {
    return Date.now() - startTime > this.delay ? timer(0) : timer(this.delay);
  }

  pageChange($event: any) {
    this.applyFilter($event.page + 1);
  }

  deleteEntity(id: number) {
    this.entityService.delete(id).subscribe({
      next: (response: any) => {
        this.onDeleteSuccess(response);
      },
      error: (response: any) => {
        this.onDeleteError(response);
      }
    });
  }

  initFilter() {
    this.filterApplyEmitter.pipe(debounceTime(200), throttleTime(200)).subscribe((page: number) => {
      const params: KeyValue<any, any>[] = [];
      for (const [keyItem, valueItem] of Object.entries<any>(this.filter)) {
        if (Array.isArray(valueItem)) {
          params.push({key: keyItem, value: valueItem.join(',')});
        } else {
          if (typeof valueItem === 'object') {
            if (Object.prototype.toString.call(valueItem) === '[object Date]') {
              params.push({key: keyItem, value: valueItem.toISOString()});
            } else {
              if (valueItem && valueItem.id) {
                params.push({key: keyItem, value: valueItem.id});
              }
            }
          } else {
            if (valueItem) {
              params.push({key: keyItem, value: valueItem});
            }
          }
        }
        const queryParams = {} as any;
        for (const param of params) {
          queryParams[param.key] = param.value;
        }
        this.router.navigate([], {queryParams, replaceUrl: true});
        this.update(page, params);
      }
      this.update(page, params);
    });
    this.applyFilter(this.page);
  }

  applyFilter(page: number = 1) {
    this.filterApplyEmitter.emit(page);
  }

  onDeleteSuccess(response: any) {
    this.update(this.page);
  }

  onDeleteError(response: any) {
    console.error(response);
  }

  prefillFilterByQueryParams() {
  }

  abstract buildCols(): TableColumn[];
}


