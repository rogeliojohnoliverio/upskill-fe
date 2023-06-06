import { Attachment } from './Attachment';

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  birthdate: Date;
  attachments: Attachment[];
  created_at: Date;
  updated_at: Date;
}
