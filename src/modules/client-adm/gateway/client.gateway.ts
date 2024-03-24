import { Client } from "../domain/client-adm.entity";

export interface ClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client[]>;
}