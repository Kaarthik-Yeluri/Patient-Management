import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB: any[] = [];
  title:string = "";
  year: number = 0;
  id: string = "";
  constructor(private dbService: DatabaseService) {}
  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any)=>{
      this.moviesDB = data;
      console.log('onGetMovies')
      console.log(JSON.stringify(this.moviesDB))
    })
  }
  onSaveMovie(){ 
    let m_obj = {title: this.title, year: this.year}
    this.dbService.createMovie(m_obj).subscribe(result=>{
      this.onGetMovies();
      console.log('onSaveMovie')
      console.log("Movie created:" + JSON.stringify(result));
    })
  }
  onDeleteMovie(item:any) {
    this.dbService.deleteMovie(item.title).subscribe(result => {
      this.onGetMovies();
      console.log('onDeleteMovie')  
    });
  }
  onDeleteMoviebyYear(item:any){
    this.dbService.deleteMoviebyYear(item.year1, item.year2).subscribe(result => {
      this.onGetMovies();
      console.log("onDelete by Year");
      
    })
  }
  onMovieUpdate(item: { title: string; year: number; id: string; }) {
    this.title = item.title;
    this.year = item.year;
    this.id = item.id;
  }
  onUpdateActorMovie() {
    let obj = { title: this.title, year: this.year};
    this.dbService.addActorToMovie(obj).subscribe(result =>{
      this.onGetMovies();
    });
  }
  
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item: { name: string; bYear: number; _id: string; }) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: { _id: string; }) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }
  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}