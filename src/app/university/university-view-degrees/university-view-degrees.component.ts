import { Component, OnInit } from '@angular/core';
import {Degree} from '../degree';
import {UniversityDegreeService} from '../university-degree.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-university-view-degrees',
  templateUrl: './university-view-degrees.component.html',
  styleUrls: ['./university-view-degrees.component.scss']
})
export class UniversityViewDegreesComponent implements OnInit {

  degrees: Degree[];

  constructor(private UniversitydegreeService: UniversityDegreeService,
              private router: Router) { }

  ngOnInit() {
    this.getDegrees();
  }
  // goToDetail(id: number): void {
  //   this.router.navigateByUrl('university/detail/' + id);

  // }

  getDegrees(): void {
    this.UniversitydegreeService.getDegrees()
    .subscribe(degrees => this.degrees = degrees);
  }

  delete(degree: Degree): void {
    this.degrees = this.degrees.filter(h => h !== degree);
    this.UniversitydegreeService.deleteDegree(degree).subscribe();
  }
}
