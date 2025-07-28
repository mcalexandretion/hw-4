import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { createUser } from '../../../app/store'; 
import type { AppDispatch } from '../../../app/store'; 
import { Input, Button, Select } from '../../../shared/ui';
import type { User } from '../../../entities/user';
import styles from './UserCreate.module.css';

interface UserForm extends Omit<User, 'id'> {
  password: string;
}

export function UserCreatePage() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserForm>({
    defaultValues: { userAgreement: false },
  });
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();
  const name = watch('name');
  const surName = watch('surName');

  useEffect(() => {
    setValue('fullName', `${name || ''} ${surName || ''}`.trim());
  }, [name, surName, setValue]);

  const onSubmit = (data: UserForm) => {
    dispatch(createUser(data));
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Name"
          {...register('name', {
            required: 'Name is required',
            maxLength: { value: 64, message: 'Max length is 64' },
          })}
          error={errors.name?.message}
        />
        <Input
          label="Surname"
          {...register('surName', {
            required: 'Surname is required',
            maxLength: { value: 64, message: 'Max length is 64' },
          })}
          error={errors.surName?.message}
        />
        <Input
          label="Full Name"
          {...register('fullName', {
            required: 'Full name is required',
            maxLength: { value: 130, message: 'Max length is 130' },
          })}
          error={errors.fullName?.message}
        />
        <Input
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <Input
          label="Birth Date"
          type="date"
          {...register('birthDate')}
        />
        <Input
          label="Telephone"
          {...register('telephone', {
            pattern: {
              value: /^\+?\d{10,12}$/,
              message: 'Invalid phone number',
            },
          })}
          error={errors.telephone?.message}
        />
        <Select
          label="Employment"
          options={[
            { value: '', label: 'Select...' },
            { value: 'employed', label: 'Employed' },
            { value: 'unemployed', label: 'Unemployed' },
          ]}
          {...register('employment')}
        />
        <label className={styles.checkbox}>
          <input type="checkbox" {...register('userAgreement')} />
          User Agreement
        </label>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}