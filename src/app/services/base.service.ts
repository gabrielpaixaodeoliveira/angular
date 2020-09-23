import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from '../services/online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends {id: string}> {

  private db: Dexie;
  private table:Dexie.Table<T, any>= null;
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    protected nomeTabela: string,
    protected urlApi: string
  ){
       this.http = this.injector.get(HttpClient);    
       this.onlineOfflineService = this.injector.get(OnlineOfflineService);
       this.ouvirStatusConexao();
       this.iniciarIndexedDb();
  }

    private iniciarIndexedDb(){
      this.db = new Dexie('db-seguros');
      this.db.version(1).stores({
        [this.nomeTabela]:'id'
      });
      this.table = this.db.table(this.nomeTabela);
    }

    
    private salvarAPI(tabela: T){
      this.http.post(`${this.urlApi}`, tabela).subscribe(
        ()=> alert("sucesso"),
       (err) => console.log(err)
      );
    }

    private async salvarLocal(tabela: T){
      try {
        await this.table.add(tabela);
        const todosTabela: T[] = await this.table.toArray();
        console.log(todosTabela);
        
      } catch (error) {
        console.log(error);
      }
    }

    private async enviarIndexedDbParaAPI(){
      const todosTabela: T[] = await this.table.toArray();
        for(const tabela of todosTabela){
          this.cadastrar(tabela);
          await this.table.delete(tabela.id);
        }
    }

   public cadastrar(tabela: T){
     if(this.onlineOfflineService.isOnline){
       this.salvarAPI(tabela);
     }
     else{
       this.salvarLocal(tabela);
     }
    }

    listar(): Observable<T[]>{
      return this.http.get<T[]>(`${this.urlApi}`);
    }

    ouvirStatusConexao(){
      this.onlineOfflineService.statusConexao.subscribe(online => {
        if(online){
          this.enviarIndexedDbParaAPI();
        }
        else{
          console.log("estou offline")
        }
      })
    }
}
