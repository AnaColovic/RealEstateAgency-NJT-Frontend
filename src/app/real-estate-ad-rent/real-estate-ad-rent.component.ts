import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RealEstateAdRent } from '../model/real-estate-ad-rent';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatDialogConfig, MatSort } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { DeleteService } from '../shared/delete.service';
import { RealEstateAdRentFormService} from '../shared/real-estate-ad-rent-form.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { RealEstateAdRentDialogComponent } from '../real-estate-ad-rent-dialog/real-estate-ad-rent-dialog.component';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';

@Component({
  selector: 'app-real-estate-ad-rent',
  templateUrl: './real-estate-ad-rent.component.html',
  styleUrls: ['./real-estate-ad-rent.component.scss']
})
export class RealEstateAdRentComponent implements OnInit {
  adsRent: RealEstateAdRent[] = [];
  admin: boolean;
  displayedColumns = ['id', 'creationDate', 'realEstate.adress', 'realEstate.city.name', 'realEstate.area', 'rentprice', 'minimummonths', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  constructor(private api: ApiService, private dialog: MatDialog, private service: RealEstateAdRentFormService, 
              private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService, private deleteService: DeleteService) {
                if(JSON.parse(localStorage.getItem('userProfile')).roles === 'ADMIN'){
                  this.admin = true;
                } else {
                  this.admin = false;
                }
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

    console.log(this.admin);
  }

  getAll(){
    this.api.getAllRentAds().subscribe(
      res => {
        res.forEach(element => {
          if(element.realEstate.owner.id === JSON.parse(localStorage.getItem('client')).id && !this.admin){
            this.adsRent.push(element);
            this.admin = false;
        }

          if (element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.NOT_APPROVED] && this.admin){
          this.adsRent.push(element);
          this.admin = true;
      }

        });
        this.dataSource.data = this.adsRent;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        this.notif.warn('Rent ads could not be loaded');
      }
    );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchFilter(){
    this.dataSource.filterPredicate = (order: RealEstateAdRent, filter: string) => {
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
    this.dialog.open(RealEstateAdRentDialogComponent, dialogConfig);
  }

  update(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.update(row);
    this.dialog.open(RealEstateAdRentDialogComponent, dialogConfig).afterClosed().subscribe(
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
    const index = this.adsRent.indexOf(row);
    this.deleteService.message = 'Are you sure you want to delete this rent ad?';
    this.openConfigDialog().afterClosed().subscribe(
      res => {
        if(res){
          this.api.deleteAdRent(row.id).subscribe(
            () => {
              this.adsRent.splice(index,1);
              this.dataSource.data = this.adsRent;
              this.changeDetectorRefs.detectChanges();
              this.notif.succes('Succesfully deleted rent ad');
            }, err => {
              this.notif.warn('Rent ad could not be deleted');
            }
          );
        }
      }
    );
  }

  approve(row){
    row.status = StatusRealEstateAd.APPROVED;
    this.api.updateAdRent(row).subscribe(
      res => {
        this.notif.succes('Rent Ad approved');
        this.changeDetectorRefs.detectChanges();
         location.reload();
      },
      err => {
        this.notif.warn('Rent Ad could not be approved');
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
