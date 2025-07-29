// "use client"

// import { FaEye,FaEyeSlash, FaArrowLeft } from "react-icons/fa";
// import { Input } from "@material-tailwind/react";
// import { useShowPassword } from "@/app/hooks/useShowPassword";
// import Link from "next/link";
// import BackButton from "@/app/components/BackButton";
// import Image from "next/image";



// export default function ResetPassword(){

//     const { showPassword, handleShowPassword } = useShowPassword();

//     return (
//         <div className="">
//             <div className="p-4">
//                 <Link href="/" className="cursor-pointer">
//                     <Image src="/logo.png" alt="Logo" width={120} height={40} className="object-contain" />
//                 </Link>
//             </div>

//             <div className="max-w-xl mx-auto px-4 py-20">
//                 <BackButton />
//                 <h1 className="text-4xl font-bold text-center  mb-1">Reset Password</h1>
//                 <p className="text-md text-gray-600 text-center" >Enter new password to reset your password</p>

//                 <form>
//                     <div className="mt-8">
//                         <div className="py-2 mb-4 relative">
//                             <Input 
//                             label="Password"
//                             id="password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter your password"
//                             className="w-full border h-[53px] rounded"
//                             />
//                             <span className="absolute top-[20px] right-[25px] cursor-pointer">
//                                     {showPassword ? (
//                                     <FaEye
//                                         color="gray"
//                                         size={20}
//                                         onClick={handleShowPassword}
//                                     />
//                                     ) : (
//                                     <FaEyeSlash
//                                         color="gray"
//                                         size={20}
//                                         onClick={handleShowPassword}
//                                     />
//                                     )}
//                                 </span>
//                         </div>
//                         <div className="relative my-8">
//                             <Input 
//                             label="Confirm Password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter your password"
//                             className="w-full border h-[53px] rounded "
//                             />
//                             <span className="absolute top-[15px] right-[25px] cursor-pointer">
//                                     {showPassword ? (
//                                     <FaEye
//                                         color="gray"
//                                         size={20}
//                                         onClick={handleShowPassword}
//                                     />
//                                     ) : (
//                                     <FaEyeSlash
//                                         color="gray"
//                                         size={20}
//                                         onClick={handleShowPassword}
//                                     />
//                                     )}
//                             </span>
//                         </div>
//                         <button
//                         className="w-full bg-primary text-white px-2 py-4 rounded mt-4"
                        
//                         >
//                         Reset Password
//                         </button>

//                     </div>
//                 </form>
//             </div>
//         </div>

//     )
// }