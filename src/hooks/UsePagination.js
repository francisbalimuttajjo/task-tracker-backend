import React from "react";


const UsePagination=(perPage,items)=>{
  const [itemsPerPage] = React.useState(perPage);
    const [page, setPage] = React.useState(1);
    const [noOfPages] = React.useState(Math.ceil(items.length / itemsPerPage));
    const display = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const handleChange = (event, value) => {
      setPage(value);
    };

    return[display,noOfPages,page,handleChange]
 }







 export default UsePagination
// const usePagination = (items, itemsPerPage) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [projectsPerPage] = useState(itemsPerPage);
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = items.slice(indexOfFirstProject, indexOfLastProject);
//   //change page
//   function paginate(no) {
//     // if (currentPage > Math.ceil(items.length / itemsPerPage)) {
//     //   setCurrentPage(currentPage - 1);
//     // }
//     setCurrentPage(no);
//   }
//   function handlePreviousPage() {
//     if (currentPage === 1) return;
//     setCurrentPage(currentPage - 1);
//   }
//   function handleNext() {
//     if (currentPage === Math.ceil(items.length / itemsPerPage)) return;
//     setCurrentPage(currentPage + 1);
//   }

//   return [
//     projectsPerPage,
//     paginate,
//     currentProjects,
//     handlePreviousPage,
//     handleNext,
//   ];
// };

// export default usePagination;
