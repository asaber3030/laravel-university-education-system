import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FileInput, FormContainer, InputField, TextArea } from "@/components/Form/FormContainer";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DepartmentsColumns } from "@/columns/departments";

import { Skeleton, Box } from "@mui/material";
import ActionLoader from "@/components/ActionLoading/ActionLoader";
import {useEffect, useState} from "react";

const CreateDepartment = () => {

  const { departments } = usePage().props
  const { data, setData, errors, post, processing } = useForm({
    title: '',
    info: '',
    icon: '',
  })
  const [loadWindow, setWindowLoader] = useState(false)

  useEffect(() => {
    if (document.readyState) {
      setWindowLoader(true)
    }
  }, [])

  const createDepartment = () => {
    post(route('professors.deps.create'))
  }

  return (
    <ProfessorLayout>

      <Head title='Create Department' />

      <ProfessorLayoutHeader title='Create Department' icon={faPlus}>

      </ProfessorLayoutHeader>

      <ActionLoader processing={processing} type='inherit' />

      {!loadWindow ? (
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <>
          <FormContainer>

            <InputField
              label='Department Name'
              value={data.title}
              handleChange={ e => setData('title', e.target.value) }
              error={errors.title}
            />

            <TextArea
              label='Department Description'
              value={data.info}
              handleChange={ e => setData('info', e.target.value) }
              error={errors.info}
            />

            <FileInput
              label='Department Icon'
              handleChange={ e => setData('icon', e.target.files[0]) }
              error={errors.icon}
            />

            <div className="form-group">
              <button onClick={createDepartment} className='btn btn-primary'>Create Department</button>
            </div>

          </FormContainer>

          <List
            rows={departments}
            columns={DepartmentsColumns}
            checkBox={false}
          />
        </>

      )}

    </ProfessorLayout>
  )
}

export default CreateDepartment
