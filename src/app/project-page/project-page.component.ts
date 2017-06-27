import { Component, OnInit } from '@angular/core';

import { Project} from './class/project';
import { ProjectsService } from './service/projects.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  providers: [ ProjectsService ],
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  errorMessage: string;
  projects: Project[];
  selectedProject: Project;
  mode = 'Observable';

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
 		this.getProjects();

  }

  getProjects() {

  	this.projectsService.getProjects()
                     .subscribe(
                       projects => this.projects = projects,
                       error =>  this.errorMessage = <any>error);

  }
  onSelect(project: Project) {
  	this.selectedProject = project;
  	console.log(this.selectedProject);
  }

}
