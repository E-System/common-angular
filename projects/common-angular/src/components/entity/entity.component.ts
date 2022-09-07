import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {EntityService} from '../../services/entity/entity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BaseFormHandler} from '../../base/base-form-handler';

@Component({
  template: ''
})
export abstract class EntityComponent<T extends { id?: number, name?: string }> extends BaseFormHandler implements OnInit {

  createMode = false;
  editMode = false;
  instance: T;
  id: number;
  duplicateId: number;

  protected constructor(protected route: ActivatedRoute,
                        protected router: Router,
                        protected location: Location,
                        protected titleService: Title,
                        protected entityService: EntityService<T>) {
    super();
  }

  ngOnInit(): void {
    this.createMode = this.route.snapshot.data.createMode;
    this.editMode = !!this.route.snapshot.params.editMode;

    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.getEntity(this.id);
    } else {
      this.instance = {} as T;
      this.form = this.buildForm();
    }

    if (this.createMode) {
      this.duplicateId = this.route.snapshot.queryParams.duplicate;
      if (this.duplicateId) {
        this.initDuplicate(this.duplicateId);
      }
    }
  }

  onSubmit(): void {
    this.beforeSubmit();
    this.submit();
  }

  private submit(): void {
    const next = (response: any) => {
      this.onSuccessSubmit(response);
    };
    const error = (response: any) => {
      console.error(response);
      this.onErrorSubmit(response);
    };

    if (this.instance.id) {
      this.request(this.entityService.update(this.instance.id, this.form.value), next, error);
    } else {
      this.request(this.entityService.create(this.form.value), next, error);
    }
  }

  private getEntity(id: number) {
    this.entityService.get(id).subscribe({
      next: (response: any) => {
        this.instance = response.data;
        this.form = this.buildForm();
        this.afterGetEntity();
      },
      error: (response: any) => {
        this.onErrorGetEntity(response);
      }
    });
  }

  get isViewMode(): boolean {
    return !this.editMode && !this.createMode;
  }

  deleteEntity(id: number): void {
    this.entityService.delete(id).subscribe({
      next: (response: any) => {
        this.onDeleteSuccess(response);
      },
      error: (response: any) => {
        this.onDeleteError(response);
      }
    });
  }

  onDeleteSuccess(response: any) {
  }

  onDeleteError(response: any) {
  }

  initDuplicate(duplicateId: number): void {
    this.entityService.get(duplicateId).subscribe({
      next: (data) => {
        this.instance = data.data;
        this.instance.id = null;
        this.form = this.buildForm();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  duplicate(): void {
    this.router.navigate(['../../create'], {
      relativeTo: this.route,
      queryParams: {
        duplicate: this.instance.id
      }
    });
  }

  cancel(): void {
    this.getEntity(this.id);
    this.editMode = false;
  }

  duplicateBack(): void {
    this.location.back();
  }

  afterGetEntity(): void {
    this.updatePageTitle();
  }

  beforeSubmit(): void {
  }

  onSuccessSubmit(response: any): void {
    this.instance = response.data;
    if (this.createMode) {
      this.router.navigate(['..', 'view', response.data.id], {relativeTo: this.route});
    } else {
      this.router.navigate(['..', response.data.id], {relativeTo: this.route});
    }
    this.createMode = false;
    this.editMode = false;
    this.updatePageTitle();
  }

  onErrorSubmit(error: any): void {
  }

  onErrorGetEntity(response: any): void {
    console.error(response);
  }

  updatePageTitle(title?: string) {
    if (title) {
      this.titleService.setTitle(title);
    } else {
      if (this.instance && this.instance.name) {
        this.titleService.setTitle(this.instance.name);
      }
    }
  }

  abstract delete(): void;
}
