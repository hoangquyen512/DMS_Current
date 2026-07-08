/** Scan one page — injected via Playwright/CDP. Returns compact page profile. */
export function scanPageProfile() {
  const q = (s) => document.querySelectorAll(s).length;
  const cols = [...document.querySelectorAll('.ant-table-thead th')]
    .map((th) => th.innerText?.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  const btns = [
    ...new Set(
      [...document.querySelectorAll('.ant-btn')]
        .map((b) => b.innerText?.trim())
        .filter(Boolean)
    ),
  ];
  const fields = [...document.querySelectorAll('.ant-form-item')]
    .map((item) => {
      const label = item.querySelector('.ant-form-item-label label')?.innerText?.trim();
      let type = 'unknown';
      if (item.querySelector('.ant-select-multiple')) type = 'select-multiple';
      else if (item.querySelector('.ant-tree-select')) type = 'tree-select';
      else if (item.querySelector('.ant-select')) type = 'select-single';
      else if (item.querySelector('.ant-picker-range')) type = 'date-range';
      else if (item.querySelector('.ant-picker')) type = 'datepicker';
      else if (item.querySelector('.ant-switch')) type = 'switch';
      else if (item.querySelector('.ant-checkbox')) type = 'checkbox';
      else if (item.querySelector('.ant-radio')) type = 'radio';
      else if (item.querySelector('.ant-input-number')) type = 'input-number';
      else if (item.querySelector('.ant-upload')) type = 'upload';
      else if (item.querySelector('textarea')) type = 'textarea';
      else if (item.querySelector('.ant-input')) type = 'input-text';
      return label ? { label, type } : null;
    })
    .filter(Boolean);

  let screenType = 'other';
  if (document.title === 'Error') screenType = 'error';
  else if (q('.ant-table') > 0) screenType = 'list';
  else if (q('.ant-tree') > 0 || q('.ant-tree-select') > 0) screenType = 'tree';
  else if (q('.ant-switch') > 2) screenType = 'config';

  return {
    title: document.title,
    url: location.href,
    screenType,
    tableColumns: cols,
    filterFields: fields,
    buttons: btns,
    components: {
      table: q('.ant-table'),
      form: q('.ant-form'),
      select: q('.ant-select'),
      selectMultiple: q('.ant-select-multiple'),
      picker: q('.ant-picker'),
      pickerRange: q('.ant-picker-range'),
      switch: q('.ant-switch'),
      checkbox: q('.ant-checkbox'),
      radio: q('.ant-radio'),
      upload: q('.ant-upload'),
      tree: q('.ant-tree'),
      treeSelect: q('.ant-tree-select'),
      cascader: q('.ant-cascader'),
      inputNumber: q('.ant-input-number'),
      modal: q('.ant-modal'),
      drawer: q('.ant-drawer'),
      tabs: q('.ant-tabs'),
      pagination: q('.ant-pagination'),
      breadcrumb: q('.ant-breadcrumb'),
      collapse: q('.ant-collapse'),
      transfer: q('.ant-transfer'),
      steps: q('.ant-steps'),
    },
  };
}
