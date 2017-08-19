import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function remove(id) {
    console.log(id);
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
var arr = [];
for(let i = 0;i<data.length;i++){
	if(~data[i].nick.indexOf('游客-')){
		arr.push(data[i])
	}
}
console.log(arr);
