export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  isAvailable: boolean;
  workingHours: string;
  type: string;
  qualification: string;
  addrLink: string;
  profilePic?: string;
}
