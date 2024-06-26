
import {MaterialReactTable,useMaterialReactTable,} from 'material-react-table';

const Grid = ({columns,data=[]}) => {

  const table = useMaterialReactTable({
    columns,
    data, 
    muiTableProps: {
      sx: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily:'vazir'
      },
    },
    muiTableHeadCellProps: {
      sx: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily:'vazir'
      },
    },
    muiTableBodyCellProps: {
      sx: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily:'vazir'
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Grid;