import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useContext } from "react"
import { ThemeContext } from "../contexts/themeContext"

export default function ButtonPopup({buttonText, popupText, popupTitle, popupButton, popupButtonLink}: {buttonText: string, popupText: string, popupTitle: string, popupButton: string, popupButtonLink: string}) {
  const { theme } = useContext(ThemeContext);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`w-full max-w-xs px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}`}
      >
        {buttonText}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`w-full max-w-md transform bg-opacity-80 backdrop-blur-lg overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}
                  >
                    {popupTitle}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-500'}`}>
                      {popupText}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 ${theme === 'dark' ? 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300' : 'bg-zinc-800 text-zinc-50 hover:bg-zinc-900'}`}
                      onClick={closeModal}
                    >
                      {popupButton}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
