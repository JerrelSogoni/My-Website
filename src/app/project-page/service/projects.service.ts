import { Injectable } from '@angular/core';

import { Http, Response }          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Project } from '../class/project';

@Injectable()
export class ProjectsService {
	
	private projectUrl = 'assets/php/server.php';
	
  	constructor(private http: Http) { }
  	getProjects() : Observable<Project[]> {
    return this.http.get("http://localhost:8000")
                    .map(this.extractData)
                    .catch(this.handleError);
  }


private extractData(res: Response) {
	console.log(res);
    let projects = res.json();

    var project_parsed: Project[] = [];
    var arrayLength = projects.length;
    for (var projectNum = 0; projectNum < arrayLength; projectNum++){
    	let project = new Project();
    	var projectInfo = projects[projectNum];
    	project.name = projectInfo.name;
    	project.description = projectInfo.description;
    	project.link = projectInfo.link;
    	project.repo_link = projectInfo.repo_link;
    	project.blog_link = projectInfo.blog_link;
    	project.collaborators = projectInfo.collaborators;
    	project.idea_creators = projectInfo.idea_creators;
    	project.image_description = projectInfo.image_description;
    	project.image_path = projectInfo.image_path;
    	project.start_date = projectInfo.start_date;
    	project.end_date = projectInfo.end_date;
    	project_parsed.push(project);
    }

    return  project_parsed || { };
  }
 private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



}
