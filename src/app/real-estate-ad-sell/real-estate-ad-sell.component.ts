import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RealEstateAdSell } from '../model/real-estate-ad-sell';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatDialogConfig, MatSort } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { DeleteService } from '../shared/delete.service';
import { RealEstateAdSellFormService } from '../shared/real-estate-ad-sell-form.service';
import { RealEstateAdSellDialogComponent } from '../real-estate-ad-sell-dialog/real-estate-ad-sell-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';

@Component({
  selector: 'app-real-estate-ad-sell',
  templateUrl: './real-estate-ad-sell.component.html',
  styleUrls: ['./real-estate-ad-sell.component.scss']
})
export class RealEstateAdSellComponent implements OnInit {
  adSell: RealEstateAdSell[] = [];
  admin: boolean;
  displayedColumns = ['id', 'creationDate', 'realEstate.adress', 'realEstate.city.name', 'realEstate.area', 
  'price', 'registered', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  constructor(private api: ApiService, private dialog: MatDialog, private service:  RealEstateAdSellFormService,
              private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService, private deleteService: DeleteService) {
                if(JSON.parse(localStorage.getItem('userProfile')).roles === 'ADMIN'){
                  this.admin = true;
                } else this.admin = false;
              }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    ngOnInit() {
      this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
      this.dataSource.sort = this.sort;
      this.getAll();
      this.searchFilter();
    }

    getAll(){
      this.api.getAllSellAds().subscribe(
        res => {
          res.forEach(element => {
            if(element.realEstate.owner.id === JSON.parse(localStorage.getItem('client')).id && !this.admin){
              this.adSell.push(element);
              this.admin = false;
          }
  
            if (element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.NOT_APPROVED] && this.admin){
            this.adSell.push(element);
            this.admin = true;
        }
          });
          this.dataSource.data = this.adSell;
          this.changeDetectorRefs.detectChanges();
        },
        err => {
          this.notif.warn('Sell ads could not be loaded');
        }
      );

    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    searchFilter(){
      this.dataSource.filterPredicate = (order: RealEstateAdSell, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        const listAsFlatString = (obj): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
            if (typeof val !== 'object') {
              returnVal = returnVal + ' ' + val;
            } else if (val !== null) {
              returnVal = returnVal + ' ' + listAsFlatString(val);
            }
          });
  
          return returnVal.trim().toLowerCase();
        };
  
        return listAsFlatString(order).includes(transformedFilter);
      };
    }

    view(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.view(row);
      this.dialog.open(RealEstateAdSellDialogComponent, dialogConfig);

    }
  
    update(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.update(row);
      this.dialog.open(RealEstateAdSellDialogComponent, dialogConfig).afterClosed().subscribe(
          res => {
            this.changeDetectorRefs.detectChanges();
            // this.sleep(3000).then(
            //   () => {
            //     location.reload();
            //   }
            // );
          }
        );
  
    }
  
    delete(row){
      const index = this.adSell.indexOf(row);
      this.deleteService.message = 'Are you sure you want to delete this sell ad?';
      this.openConfigDialog().afterClosed().subscribe(
        res => {
          if(res){
            this.api.deleteAdRent(row.id).subscribe(
              () => {
                this.adSell.splice(index,1);
                this.dataSource.data = this.adSell;
                this.changeDetectorRefs.detectChanges();
                this.notif.succes('Succesfully deleted sell ad');
              }, err => {
                this.notif.warn('Sell ad could not be deleted');
              }
            );
          }
        }
      );
    }

    approve(row){
      row.status = StatusRealEstateAd.APPROVED;
      this.api.updateAdSell(row).subscribe(
        res => {
          this.notif.succes('Selel Ad approved');
          this.changeDetectorRefs.detectChanges();
           location.reload();
        },
        err => {
          this.notif.warn('Sell Ad could not be approved');
        }
      )
    }

    openConfigDialog() {
      return this.dialog.open(DeleteDialogComponent, {
        width: '390px',
        panelClass: 'confirm-dialog-container',
        position: { top: '5%' },
        disableClose: true
      });
    }

    sortingDataAccessor(item, property) {
      if (property.includes('.')) {
        return property.split('.')
        .reduce((object, key) => object[key] || '',item);
      }
      return item[property];
    }
}
