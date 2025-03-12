import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { NgForm } from '@angular/forms';
import { IGroup, IRecord } from "../ecommerce.interface";
import { RecordsService } from "../services/records.service";
import { GroupsService } from "../services/groups.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [ConfirmationService],
})
export class RecordsComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('fileInput') fileInput!: ElementRef;
  visibleError = false;
  errorMessage = '';
  records: IRecord[] = [];
  filteredRecords: IRecord[] = [];
  visibleConfirm = false;
  imageRecord = '';
  visiblePhoto = false;
  photo = '';
  searchText: string = '';

  record: IRecord = {
    idRecord: 0,
    titleRecord: '',
    yearOfPublication: null,
    imageRecord: null,
    photo: null,
    price: 0,
    stock: 0,
    discontinued: false,
    groupId: null,
    nameGroup: ''
  };

  groups: any[] = [];
  recordService: any;
  constructor(
    private recordsService: RecordsService,
    private groupsService: GroupsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getRecords();
    this.getGroups();
  }

  getRecords() {
        this.recordsService.getRecords().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.records = data;
        this.filteredRecords = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  filterRecords() {
    if (!this.searchText) {
      this.filteredRecords = this.records;
    } else {
      this.filteredRecords = this.records.filter(record => {
        return (
          record.nameGroup.toLowerCase().includes(this.searchText.toLowerCase()) ||
          record.titleRecord.toLowerCase().includes(this.searchText.toLowerCase()) ||
          (record.yearOfPublication ? record.yearOfPublication.toString().includes(this.searchText) : false)
        );
      });
    }
  }

  onSearchChange() {
    this.filterRecords();
  }

  getGroups() {
        this.groupsService.getGroups().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.groups = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  onChange(event: any) {
    const file = event.target.files;

    if (file && file.length > 0) {
        this.record.photo = file[0];
        this.record.photoName = file[0].name;
    }
}

  onAceptar() {
    this.fileInput.nativeElement.value = '';
  }

  showImage(record: IRecord) {
    if (this.visiblePhoto && this.record === record) {
      this.visiblePhoto = false;
    } else {
      this.record = record;
      this.photo = record.imageRecord!;
      this.visiblePhoto = true;
    }
  }

  save() {
    if (this.record.idRecord === 0) {
            this.recordsService.addRecord(this.record).subscribe({
            next: (data) => {
                this.visibleError = false;
                this.form.reset();
                this.getRecords();
            },
            error: (err) => {
              console.log(err);
              this.visibleError = true;
              this.controlError(err);
            },
        });
    } else {
            this.recordsService.updateRecord(this.record).subscribe({
            next: (data) => {
                this.visibleError = false;
                this.cancelEdition();
                this.form.reset();
                this.getRecords();
            },
            error: (err) => {
                this.visibleError = true;
                this.controlError(err);
            },
        });
    }
}
  confirmDelete(record: IRecord) {
    this.confirmationService.confirm({
      message: `Delete record ${record.titleRecord}?`,
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteRecord(record.idRecord),
    });
  }

  deleteRecord(id: number) {
        this.recordsService.deleteRecord(id).subscribe({
      next: (data: IRecord) => {
        this.visibleError = false;
        this.getRecords();
      },
      error: (err: any) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  edit(record: IRecord) {
    this.record = { ...record };
    this.record.photoName = record.imageRecord ? this.extractImageName(record.imageRecord) : '';
  }

  extractImageName(url: string): string {
    return url.split('/').pop() || '';
  }

  cancelEdition() {
    this.record = {
      idRecord: 0,
      titleRecord: '',
      yearOfPublication: null,
      imageRecord: null,
      photo: null,
      price: 0,
      stock: 0,
      discontinued: false,
      groupId: null,
      nameGroup: ''
    };
  }

  controlError(err: any) {
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.errorMessage = err.error.message;
    } else if (typeof err.error === 'string') {
      this.errorMessage = err.error;
    } else {
      this.errorMessage = 'An unexpected error has occurred';
    }
  }

}
