import {UserDTO} from "./user-dto";

export interface AuthenticationResponse {
  token?: string;
  userDTO?: UserDTO;
}
