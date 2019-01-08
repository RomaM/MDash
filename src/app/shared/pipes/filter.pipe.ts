import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(data: any, prop: string, filter: string) {
      let filteredData = '';
      if (data && filter.length !== 0) {
        filteredData = data.filter(
          (obj) => {
            return obj[prop].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) !== -1;
          }
        );
        return filteredData;
      }
      return data;
    }
}
