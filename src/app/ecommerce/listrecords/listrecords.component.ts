import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { IRecord } from "../ecommerce.interface";
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from "../services/records.service";
import { GroupsService } from "../services/groups.service";

@Component({
  selector: 'app-listrecords',
  templateUrl: './listrecords.component.html',
  styleUrls: ['./listrecords.component.css'],
  providers: [ConfirmationService],
})
export class ListrecordsComponent implements OnInit {
  records: IRecord[] = [];
  searchText: string = '';
  groupId: string | null = null;
  errorMessage = '';
  visibleError = false;
  groupName: string = '';

  constructor(
    private recordsService: RecordsService,
    private groupsService: GroupsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('idGroup');
      if (this.groupId) {
        this.loadRecords(this.groupId);
        this.getGroupName(this.groupId);
      }
    });
  }

  loadRecords(idGroup: string): void {
    console.log(`Loading records for group ID: ${idGroup}`);
      this.recordsService.getRecordsByGroup(idGroup).subscribe(
      (data: any) => {
        console.log('Records loaded:', data);
        this.records = data.records || [];
        this.getGroupName(idGroup);
      },
      (error) => {
        console.error('Error loading records:', error);
        this.errorMessage = 'Error loading records';
        this.visibleError = true;
      }
    );
  }

  getGroupName(idGroup: string): void {
      this.groupsService.getGroupName(idGroup).subscribe({
      next: (data: any) => {
        this.groupName = data.nameGroup;
      },
      error: (error) => {
        console.error('Error loading group name:', error);
        this.errorMessage = 'Error loading group name';
        this.visibleError = true;
      },
      complete: () => {
      }
    });
  }

  get filteredRecords(): IRecord[] {
    return this.records.filter(record =>
      record.titleRecord.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (record.yearOfPublication?.toString() || '').includes(this.searchText)
    );
  }

}
