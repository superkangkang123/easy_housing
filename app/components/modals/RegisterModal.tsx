'use client';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone:''
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => 
  {
    setIsLoading(true);
    axios.post('/api/register', data)
    .then(() => {
        registerModal.onClose();
    })
    .catch((error) => {
        toast.error('Error: registration failed, try again!');
    })
    .finally(() => {
        setIsLoading(false);
      })
  }
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])
  const bodyContent =(
      <div className = "flex flex-col gap-4">
        <Heading 
           title = "Speedy registration"
        />
        <Input  
            id = "name"
            label = "Name"
            disabled = {isLoading}
            register = {register}
            errors = {errors}
            required
        />
        <Input  
            id = "phone"
            label = "Phone"
            disabled = {isLoading}
            register = {register}
            errors = {errors}
            required
        />
        <Input  
            id = "email"
            label = "Email"
            disabled = {isLoading}
            register = {register}
            errors = {errors}
            required
        />
        <Input  
            id = "password"
            type = "password"
            label = "Password"
            disabled = {isLoading}
            register = {register}
            errors = {errors}
            required
        />
      </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Create with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Create with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
         <div className="justify-center flex flex-row items-center gap-2">
         <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
         </div>
      </div>
    </div>
  )
    return ( 
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Welcome welcome :)"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body ={bodyContent}
      footer={footerContent}
    />
     );
}
 
export default RegisterModal;