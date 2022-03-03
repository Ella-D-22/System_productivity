import { Message } from "./message";

export interface Response {
    message: Message;
    entity: any;
    statusCode: number
  }