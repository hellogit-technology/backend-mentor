import { Request, Response, NextFunction } from 'express';
import moment from 'moment-timezone';

const showData = (req: Request, res: Response, next: NextFunction) => {
  // Show select month
  res.locals.selectMonth = parseInt(moment(new Date()).tz('Asia/Ho_Chi_Minh').format('M'));

  // Format date (UTC +07)
  res.locals.formatDate = (value?: string | Date, format: string = 'DD/MM/YYYY', tz: string = 'Asia/Ho_Chi_Minh') => {
    if (!value) {
      return '';
    }
    const data = moment(value);
    if (!data.isValid()) {
      return value;
    }
    data.tz(tz);
    return data.format(format);
  };

  // Pagination
  res.locals.pagination = (endpoint: string, current: number, pages: number) => {
    let html = '';
    if (pages > 0) {
      //? First Page
      if (current == 1) {
        html += `
          <li class="disabled page-item">
            <a href="#" class="page-link">‹</a>
          </li>
        `;
      } else {
        html += `
          <li class="page-item">
            <a href="#" class="page-link">‹</a>
          </li>
        `;
      }

      //? Items Page
      let i: number = current > 4 ? current - 3 : 1;
      if (i !== 1) {
        html += `
          <li class="disabled page-item">
            <a href="#" class="page-link">...</a>
          </li>
        `;
      }
      for (i <= current + 3; i <= pages; i++) {
        if (i == current) {
          html += `
            <li class="active page-item">
              <a href="${endpoint}/?page=${i}" class="page-link">${i}</a>
            </li>
          `;
        } else {
          html += `
            <li class="page-item">
              <a href="${endpoint}/?page=${i}" class="page-link">${i}</a>
            </li>
          `;
        }
        if (i == current + 3 && i < pages) {
          html += `
            <li class="disabled page-item">
              <a href="#" class="page-link">...</a>
            </li>
          `;
          break;
        }
      }

      //? Next Page
      if (current !== pages) {
        html += `
          <li class="page-item">
            <a class="page-link" href="${endpoint}/?page=${current + 1}">
              ›
            </a>
          </li>
        `;
      } else {
        html += `
          <li class="page-item disabled">
            <a class="page-link" href="${endpoint}/?page=${pages}">
              ›
            </a>
          </li>
        `;
      }

      //? Last Page
      if (current == pages) {
        html += `
          <li class="page-item disabled">
            <a class="page-link" href="#">»</a></a>
          </li>
        `;
      } else {
        html += `
          <li class="page-item">
            <a class="page-link" href="${endpoint}/?page=${pages}">
              »
            </a>
          </li>
        `;
      }
    }

    return html;
  };

  next();
};

export default showData;
