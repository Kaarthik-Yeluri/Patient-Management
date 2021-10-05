import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data:any) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  

  getMovies(){
    return this.http.get("/movies");
  }
  createMovie(data:any){
    return this.http.post("/movies", data, httpOptions);
  }
  addActorToMovie(data:any){
    let url = "/movAct/"
    return this.http.put(url, data, httpOptions);
  }
  deleteMovie(title:string){
    let url = "/movies/" + title;
    return this.http.delete(url, httpOptions);
  }
  deleteMoviebyYear(year1:number, year2:number){
    let url = "/movies/" + year1 + "/" + year2;
    return this.http.delete(url, httpOptions);
  }
}