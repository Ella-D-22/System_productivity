import {Message} from 'src/app/interfaces/message'

export interface Response {
    message: Message;
    entity: any;
    statusCode: number
  }