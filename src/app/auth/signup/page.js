// "use client";

// import { useState, useEffect } from "react";
// import { useAuthActions } from "@/app/hooks/useAuth";
// import { useFormik } from "formik";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Input, Select, Option } from "@material-tailwind/react";
// import { useShowPassword } from "@/app/hooks/useShowPassword";
// import * as Yup from "yup";
// import Link from "next/link";
// import BackButton from "@/app/components/BackButton";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";
// import { useAlert } from "@/app/context/AlertContext";
// import { Spinner } from "@material-tailwind/react";
// import Image from "next/image";

// export default function SignUp() {
//   const nigeria = {
//     name: "Nigeria",
//     flag: "https://flagcdn.com/w40/ng.png",
//     countryCallingCode: "+234",
//   };

//   const { showAlert } = useAlert();
//   const { signUp, loading } = useAuthActions();
//   const router = useRouter();
//   const { showPassword, handleShowPassword } = useShowPassword();
//   const [isFocused, setIsFocused] = useState(false);
//   const { selectedPlan } = useAuth();

//   const handleFormSubmission = (values) => {
//     try {
//       const { confirmPassword, ...formData } = values;
//       signUp.mutate(formData, {
//         onSuccess: () => {
//           showAlert("Registration successful", "success");
//           router.push("/plans/choose-duration");
//         },
//         onError: (error) => {
//           const errorMessage =
//             error?.response?.data.message || "Login failed. Try again.";
//           showAlert(errorMessage, "error");
//         },
//       });
//     } catch (error) {
//       showAlert("An unexpected error occurred!", "error");
//     }
//   };

//   const validPlan = Array.isArray(selectedPlan)
//     ? selectedPlan[0]
//     : selectedPlan;

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//       industry: "",
//       address: "",
//       taxId: "",
//       cacNumber: "",
//       password: "",
//       confirmPassword: "",
//       planType: validPlan,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Company Name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Company Email is required"),
//       phone: Yup.string()
//         .matches(
//           /^[0-9]{10,15}$/,
//           "Phone number must be between 10 and 15 digits"
//         )
//         .required("Company Phone Number is required"),
//       industry: Yup.string().required("Industry is required"),
//       address: Yup.string().required("Company Address is required"),
//       taxId: Yup.string(),
//       cacNumber: Yup.string(),
//       password: Yup.string()
//         .min(8, "Password must be at least 8 characters")
//         .required("Password is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Please confirm your password"),
//       planType: Yup.string().required("Plan Type is required"),
//     }),
//     onSubmit: handleFormSubmission,
//   });

//   useEffect(() => {
//     if (selectedPlan) {
//       formik.setFieldValue("planType", selectedPlan);
//     }
//   }, [selectedPlan, formik]);

//   return (
//     <div>
//       {/* navigation */}
//       <div className="p-4">
//         <Link href="/" className="cursor-pointer">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={120}
//             height={40}
//             className="object-contain"
//           />
//         </Link>
//       </div>

//       {/* form section */}
//       <div className="max-w-xl mx-auto p-4">
//         <BackButton />

//         <h1 className="text-4xl font-bold">Company Details</h1>
//         <p className="text-md text-gray-600">
//           Enter your company details below to create your account and get
//           started
//         </p>

//         <form onSubmit={formik.handleSubmit}>
//           <div className="mt-8">
//             <div className="mt-4">
//               <Input
//                 label="Company Name"
//                 name="name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && formik.errors.name}
//               />
//               {formik.touched.name && formik.errors.name ? (
//                 <div className="text-red-500 text-sm">{formik.errors.name}</div>
//               ) : null}
//             </div>
//             <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 mt-4">
//               <div className="w-full">
//                 <Input
//                   label="Company Email"
//                   name="email"
//                   type="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.email && formik.errors.email}
//                   className="w-full"
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.email}
//                   </div>
//                 ) : null}
//               </div>

//               <div className="w-full">
//                 <Input
//                   type="tel"
//                   name="phone"
//                   value={formik.values.phone}
//                   onChange={formik.handleChange}
//                   onBlur={(e) => {
//                     setIsFocused(!!formik.values.phone);
//                     formik.handleBlur(e);
//                   }}
//                   onFocus={() => setIsFocused(true)}
//                   placeholder="Company Phone Number"
//                   label="Company Phone Number"
//                   className="pl-14 w-full"
//                   error={formik.touched.phone && formik.errors.phone}
//                   style={{
//                     backgroundImage: isFocused
//                       ? `url(${nigeria.flag})`
//                       : "none",
//                     backgroundPosition: "10px center",
//                     backgroundSize: "20px 20px",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                 />
//                 {formik.touched.phone && formik.errors.phone ? (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.phone}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="mt-4">
//               <Select
//                 label="Select Industry"
//                 value={formik.values.industry}
//                 onChange={(val) => formik.setFieldValue("industry", val)}
//                 error={formik.touched.industry && formik.errors.industry}
//               >
//                 <Option value="Education">Education</Option>
//                 <Option value="Finance">Finance</Option>
//                 <Option value="Management">Management</Option>
//                 <Option value="Science/I.T">Science/I.T</Option>
//                 <Option value="Sales">Sales</Option>
//                 <Option value="Others">Others</Option>
//               </Select>
//               {formik.touched.industry && formik.errors.industry ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.industry}
//                 </div>
//               ) : null}
//             </div>
//             <div className="mt-4">
//               <Input
//                 label="Company Address"
//                 name="address"
//                 value={formik.values.address}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.address && formik.errors.address ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.address}
//                 </div>
//               ) : null}
//             </div>
//             <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 mt-4">
//               <div className="w-full">
//                 <Input
//                   label="Tax Identification Number"
//                   name="taxId"
//                   value={formik.values.taxId}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   placeholder="Tax Identification number"
//                 />
//                 {formik.touched.taxId && formik.errors.taxId ? (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.taxId}
//                   </div>
//                 ) : null}
//               </div>
//               <div className="w-full">
//                 <Input
//                   label="C.A.C Number"
//                   name="cacNumber"
//                   value={formik.values.cacNumber}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.cacNumber && formik.errors.cacNumber}
//                   placeholder="Coperate Affairs Commission Number"
//                 />
//                 {formik.touched.cacNumber && formik.errors.cacNumber ? (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.cacNumber}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="mt-4 relative">
//               <Input
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && formik.errors.password}
//               />
//               <span
//                 className="absolute top-[10px] right-[25px] cursor-pointer"
//                 onClick={handleShowPassword}
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </span>

//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.password}
//                 </div>
//               ) : null}
//             </div>
//             <div className="mt-4 relative">
//               <Input
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 value={formik.values.confirmPassword}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               <span
//                 className="absolute top-[10px] right-[25px] cursor-pointer"
//                 onClick={handleShowPassword}
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </span>

//               {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.confirmPassword}
//                 </div>
//               ) : null}
//             </div>

//             {selectedPlan ? (
//               <div className="mt-4">
//                 <Input label="Plan" value={selectedPlan} disabled />{" "}
//               </div>
//             ) : null}
//             <button
//               type="submit"
//               className="w-full bg-primary text-white px-2 py-4 rounded mt-4"
//               disabled={signUp.loading}
//               onClick={() => {
//                 console.log("planType");
//                 console.log(formik.errors);
//               }}
//             >
//               {loading ? <Spinner /> : "Continue"}
//             </button>
//             <p className="mt-6 text-gray-600 text-center">
//               Already have an account?{" "}
//               <Link href="/auth/login">
//                 <span className="text-primary">Login</span>
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
