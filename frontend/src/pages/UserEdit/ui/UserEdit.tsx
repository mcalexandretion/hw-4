import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { updateUser } from '../../../app/store'; 
import type { RootState, AppDispatch } from '../../../app/store'; 
import { Input, Button, Select } from '../../../shared/ui';
import styles from './UserEdit.module.css';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').max(64, 'Max length is 64'),
  surName: Yup.string().required('Surname is required').max(64, 'Max length is 64'),
  fullName: Yup.string().required('Full name is required').max(130, 'Max length is 130'),
  telephone: Yup.string().matches(/^\+?\d{10,12}$/, 'Invalid phone number').optional(),
});

export function UserEditPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.users.find((u) => u.id === id));

  if (!user) return <div>User not found</div>;

  return (
    <div className={styles.container}>
      <h2>Edit User</h2>
      <Formik
        initialValues={{
          name: user.name,
          surName: user.surName,
          fullName: user.fullName,
          birthDate: user.birthDate || '',
          telephone: user.telephone || '',
          employment: user.employment || '',
          userAgreement: user.userAgreement || false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateUser({ id: user.id, data: values }));
          navigate('/');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <div>
              <label>Name</label>
              <Field
                as={Input}
                name="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('name', e.target.value);
                  setFieldValue('fullName', `${e.target.value} ${values.surName}`.trim());
                }}
              />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>
            <div>
              <label>Surname</label>
              <Field
                as={Input}
                name="surName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('surName', e.target.value);
                  setFieldValue('fullName', `${values.name} ${e.target.value}`.trim());
                }}
              />
              <ErrorMessage name="surName" component="span" className={styles.error} />
            </div>
            <div>
              <label>Full Name</label>
              <Field as={Input} name="fullName" />
              <ErrorMessage name="fullName" component="span" className={styles.error} />
            </div>
            <div>
              <label>Birth Date</label>
              <Field as={Input} name="birthDate" type="date" />
            </div>
            <div>
              <label>Telephone</label>
              <Field as={Input} name="telephone" />
              <ErrorMessage name="telephone" component="span" className={styles.error} />
            </div>
            <Select
              label="Employment"
              options={[
                { value: '', label: 'Select...' },
                { value: 'employed', label: 'Employed' },
                { value: 'unemployed', label: 'Unemployed' },
              ]}
              name="employment"
            />
            <label className={styles.checkbox}>
              <Field type="checkbox" name="userAgreement" />
              User Agreement
            </label>
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}