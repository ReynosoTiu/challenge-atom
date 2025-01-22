import { HttpHeaders } from "@angular/common/http";

export const GET_HEADERS = (): HttpHeaders => {
    return new HttpHeaders(
        {
            'Content-Type': 'application/json'
        }
    );
}