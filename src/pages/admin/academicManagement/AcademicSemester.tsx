import { useGetAllSemestersQuery } from "../../../redux/featuers/admin/academicManagement.api"


const AcademicSemester = () => {
    const {data} = useGetAllSemestersQuery(undefined)
  return (
    <div>AcademicSemester</div>
  )
}

export default AcademicSemester