import { useFormik } from "formik"
import * as Yup from "yup"

export default function Form() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(25, "Must be 25 characters or less")
                .required("name (required)"),
            email: Yup.string()
                .email("Invalid email address")
                .required("email (required)"),
            message: Yup.string()
                .max(200, "Must be 200 characters or less")
                .required("message (required)"),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <form 
            className='p-2 flex flex-col gap-5'
            onSubmit={formik.handleSubmit}
        >
            <div className='flex flex-col'>
                <label htmlFor="name" className='text-white'>
                    <span className='text-blueCode'>cin</span> &gt;&gt; {formik.touched.name && formik.errors.name ? formik.errors.name : "name"}
                </label>
                <input 
                    className="focus:outline-none min-w-[250px] text-white bg-darkLight border-2 border-white mt-2 rounded-md p-2" 
                    type="text" 
                    name="name" 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email" className='text-white'>
                    <span className='text-blueCode'>cin</span> &gt;&gt; {formik.touched.email && formik.errors.email ? formik.errors.email : "email"}
                </label>
                <input 
                    className="focus:outline-none min-w-[250px] text-white bg-darkLight border-2 border-white mt-2 rounded-md p-2" 
                    type="email" 
                    name="email" 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="message" className='text-white'>
                    <span className='text-blueCode'>cin</span> &gt;&gt; {formik.touched.message && formik.errors.message ? formik.errors.message : "message"}
                </label>
                <textarea 
                    className="resize-none focus:outline-none min-w-[250px] text-white bg-darkLight border-2 border-white mt-2 rounded-md p-2" 
                    name="message" 
                    cols={30} rows={10}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <button className='bg-white px-3 py-2 rounded-md mt-2'>
                <span className='text-darkLight text-base md:text-lg font-semibold'>Send it!</span>
            </button>
        </form>
    )
}