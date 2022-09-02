import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    cols = 3;
    rowHeight = 500;
    handsetPortrait: boolean

    constructor(private dialog: MatDialog,
        private responsive: BreakpointObserver) {
}

ngOnInit() {
    
            this.responsive.observe([
                Breakpoints.TabletPortrait,
                Breakpoints.TabletLandscape,
                Breakpoints.HandsetPortrait,
                Breakpoints.HandsetLandscape
            ])
                .subscribe(result => {
                    this.cols = 3;
                    this.rowHeight = 500;
                    this.handsetPortrait = false;
                    const breakpoints = result.breakpoints;
                    if (breakpoints[Breakpoints.TabletPortrait]) {
                        this.cols = 1;
                    }
                    else if (breakpoints[Breakpoints.HandsetPortrait]) {
                        this.cols = 1;
                        this.rowHeight = 430;
                        this.handsetPortrait = true;
                    }
                    else if (breakpoints[Breakpoints.HandsetLandscape]) {
                        this.cols = 1;
                    }
                    else if (breakpoints[Breakpoints.TabletLandscape]) {
                        this.cols = 2;
                    }
                });
    
        }

    editCourse(course:Course) {


    }

}









