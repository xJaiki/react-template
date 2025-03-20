import React from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import AnimatedLogo from '../components/ui/AnimatedLogo';

const Home = () => {

  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  if (counter === 5) {
    // Quando il counter raggiunge 5, generiamo un errore
    throw new Error('I crashed when counter reached 5!');
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Eureka, it works! <span className="text-sm font-medium text-gray-600">i hope </span>
          </h1>
          <AnimatedLogo width="32" height="32" />
          <div className="p-6 bg-green-100 rounded-lg my-8">
            <p className="text-lg text-green-700 font-medium">
              Great! The template has been configured correctly. <br /> You can procede by deleting the content of this page and start building your app.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-left border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0">
            <h2 className="text-xl font-bold mb-4 text-rose-600">
              Project Information
            </h2>
            <p className="text-gray-700 mb-4">
              This is a minimal React + Tailwind CSS template. It includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>React 19 with optimized Vite configuration</li>
              <li>Tailwind CSS 4.0 preconfigured</li>
              <li>React Router for navigation</li>
              <li>Ready-to-use layout components</li>
              <li>i18n support for internationalization</li>
              <li>Lucide React icons integrated</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 text-left border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0 mt-8">
            <h2 className="text-xl font-bold mb-4 text-rose-600">
              Toast Notifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => toast.error('This is an error toast!')}
                className="p-4 bg-red-500 hover:bg-red-700 text-white rounded shadow"
              >
                Show Error Toast
              </button>
              <button
                onClick={() => toast.success('This is a success toast!')}
                className="p-4 bg-green-500 hover:bg-green-700 text-white rounded shadow"
              >
                Show Success Toast
              </button>
              <button
                onClick={() => {
                  const toastId = toast.loading('Loading...');
                  setTimeout(() => {
                    toast.dismiss(toastId);
                    toast.success('Loading complete!');
                  }, 2000);
                }}
                className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded shadow"
              >
                Show Loading Toast
              </button>
              <button
                onClick={() =>
                  toast.custom((t) => (
                    <div
                      className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex p-4`}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Custom toast notification!
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          This is a custom toast with custom styling.
                        </p>
                      </div>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        Close
                      </button>
                    </div>
                  ))
                }
                className="p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded shadow"
              >
                Show Custom Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-left border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0 mt-8">
            <h2 className="text-xl font-bold mb-4 text-rose-600">
              Error Boundary Example
            </h2>
            <p className="mb-4 text-gray-600">
              This counter will crash when it reaches 5!! now it's {counter}
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
            >
              Increment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;