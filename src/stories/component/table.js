import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Table from '../../app/component-legacy/table'
import TableHeadCell from '../../app/component-legacy/table-head-cell'
import TableRow from '../../app/component-legacy/table-row'
import TableCell from '../../app/component-legacy/table-cell'
import FootCell from '../../app/component-legacy/table-foot-cell'

storiesOf('Table', module)
  .add('default', () => (
    <Table
      bulkActions
      selectedAll={false}
      onChangeSelectAll={action('onChangeSelectAll')}
      head={[
        <TableHeadCell
          key={1}
          onChangeOrderClicked={action('onChangeOrderClicked')}
        >Column 1</TableHeadCell>,
        <TableHeadCell
          key={2}
          onChangeOrderClicked={action('onChangeOrderClicked')}
        >Column 1</TableHeadCell>
      ]}
      foot={[
        <FootCell key={1}>Foot Column 2</FootCell>,
        <FootCell key={2}>Foot Column 3</FootCell>
      ]}
      rows={[
        <TableRow key={0} selected onChangeSelect={action('onChangeSelect')}>
          <TableCell>Row 1 Colum 2</TableCell>
          <TableCell>Row 1 Colum 3</TableCell>
        </TableRow>,
        <TableRow key={1} selected={false} onChangeSelect={action('onChangeSelect')}>
          <TableCell>Row 2 Colum 2</TableCell>
          <TableCell>Row 2 Colum 3</TableCell>
        </TableRow>
      ]}
    />
  ))
  .add('no bulk actions', () => (
    <Table
      head={[
        <TableHeadCell key={1}>Column 1</TableHeadCell>,
        <TableHeadCell key={2}>Column 1</TableHeadCell>
      ]}
      foot={[
        <FootCell key={1}>Foot Column 2</FootCell>,
        <FootCell key={2}>Foot Column 3</FootCell>
      ]}
      rows={[
        <TableRow key={0}>
          <TableCell>Row 1 Colum 2</TableCell>
          <TableCell>Row 1 Colum 3</TableCell>
        </TableRow>,
        <TableRow key={1}>
          <TableCell>Row 2 Colum 2</TableCell>
          <TableCell>Row 2 Colum 3</TableCell>
        </TableRow>
      ]}
    />
  ))
  .add('no head and foot rows', () => (
    <Table
      rows={[
        <TableRow key={0}>
          <TableCell>Row 1 Colum 2</TableCell>
          <TableCell>Row 1 Colum 3</TableCell>
        </TableRow>,
        <TableRow key={1}>
          <TableCell>Row 2 Colum 2</TableCell>
          <TableCell>Row 2 Colum 3</TableCell>
        </TableRow>
      ]}
    />
  ))

