# Geekit - webapp

Geekit is a web application created for a school project at ECE Paris

Story-telling: Geekit is a fake forum for programmers (a mix between StackOverflow and LinkedIn), the forum is not entirely implemented so you just have the landing page. Stay tuned for the Forum/Blog part!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone the repository

```bash
git clone git@github.com:random-long-int/geekit.git clone-name
```

Then, install all the required packages

```bash
cd clone-name

npm install
#or
yarn install
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Styling app

We are using the tailwindcss lib to style the app. You can the the documentation for Next app [here](https://tailwindcss.com/docs/guides/nextjs).

In the `tailwindcss.config.js`, you can see some custom variables for tailwindcss

```js
extend: {
  fontFamily: {
    Fira: ["Fira Code", "sans-serif"],
  },
  colors: {
    "greenCode": "#008000",
    "darkLight": "#1D1D1E",
    "grayBg": "#A7A7A7",
    "grayCard": "#2C2C2E",
    "blueCode": "#155E75",
    "orangeCode": "#EAB308",
  }
},
```

To use the __custom font Fira__ we modify the *document* (find how [here](https://nextjs.org/docs/advanced-features/custom-document)) and we import the font using [Google Fonts](https://fonts.google.com/knowledge)

## Animations

To animate the app we use [Framer-motion](https://www.framer.com/motion/).

We are principally using animation we the component become visible on screen. Let's quickly see how if you want to modify it for your own projects.

```js
import { motion as m, Variants } from "framer-motion";

export default function About() {
    const contentVariant: Variants = {
      offscreen: {
        opacity: 0,
      },
      onscreen: {
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.8,
        }
      }
    };

    return (
      <m.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }}>
      
        <m.div variants={contentVariant}>
          Child element
        </m.div>
        
      </m.div>
    )
}
```

You just see a quick example of framer-motion possibilities. Go check the documentation to know more!

Btw for the Navbar, we used an other library which is really powerfull to (even if its a lighter one). Go check its doc [here](https://headlessui.com/).

## Form checking

The library used to make the form fonctionnal is __formik__. You can check the documentation [here](https://formik.org/).

It is easy to understand and simplify your code. You don't have to use a lot of `useState` and `ChangeEvent`.

```js
import { useFormik } from "formik";

export default function Test() {
    const formik = useFormik({
        initialValues: {
            name: "",
        },
    })

    return (
        <form
            // let the default values after submitting
            onSubmit={formik.handleSubmit}
        >
            <input 
                type="text" 
                name="name" 
                value={formik.values.name} 
                onChange={formik.handleChange}
            />
        </form>
    );
};
```

To verify if inputs have correct data we use __Yup__. You can check the documentation [here](https://www.npmjs.com/package/yup).

Like formik, it helps understanding easily the code and it comes with a lot of interesting features!

```js
import * as Yup from 'yup'
[...]

const formik = useFormik({
    [...]
    validationSchema: Yup.object({
        name: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
    }),
    [...]
})
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
