import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true // Default behaviour is True. False - will recalculate filter on any changes on the page
})

export class FilterPipe implements PipeTransform {
    transform(data: any, prop: string, filter: string) {
      let filteredData = '';
      filter = filter.toString().toLowerCase();
      if (data && filter.length !== 0 && filter !== 'all') {
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
