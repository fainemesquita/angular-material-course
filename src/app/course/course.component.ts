import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import { Lesson } from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    lessons: Lesson[] = [];

    loading = false;

    // loading: boolean = false; 
    //when the value is specified there's no need to indicate the type (boolean)

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    displayedColumns = ['seqNo', 'description', 'duration']

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.loadLessonsPage();

    }

    loadLessonsPage() {
      this.loading = true;
      this.coursesService.findLessons(
        this.course.id, 
        this.sort?.direction ?? "asc", 
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 3,
        this.sort.active ?? "seqNo"
      )
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {
            console.log("Error loading lessons", err);
            alert("Error loading lessons.");
            return throwError(err);

        }),
        finalize(() => this.loading = false)
    )
    .subscribe();
    }

    ngAfterViewInit() {

      this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 0) 
      //whenever the sort is used, takes back to the first page

      
      merge(this.sort.sortChange, this.paginator.page) 
      //merge: whenever either of the events occurs, a new Page of lessons is going to be loaded 

      .pipe(
        tap(() => this.loadLessonsPage())
    )
    .subscribe();

    }

}
