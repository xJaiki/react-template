import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '../components/ui/animatedLogo';

const About = () => {
  const age = new Date().getFullYear() - 1999;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About This Template
            </h1>
            <p className="text-lg text-gray-600">
              ...or "Why I wasted one night of my life creating this instead of sleeping"
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-8 border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0">
            <h2 className="text-2xl font-semibold mb-4 text-rose-600">
              The Creator
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <div className="w-32 h-32 flex items-center justify-center ">
                <AnimatedLogo width="32" height="32" />
              </div>
              <div>
                <p className="text-gray-700 mb-2">
                  Hey there! I'm Jaiki, a {age}-year-old full-stack developer from Naples, Italy (though I'm backend at heart 
                  with a front-end crush that just won't quit).
                </p>
                <p className="text-gray-700 mb-2">
                  I created this template after my 47th mental breakdown trying to set up React with Tailwind. 
                  You know the drill: npm install this, configure that, fix weird errors, question your career choices, 
                  contemplate becoming a farmer... the usual.
                </p>
                <p className="text-gray-700">
                  Oh, and I whipped up that little logo because I enjoy pretending to be a designer in my spare time. 
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-8 border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0">
            <h2 className="text-2xl font-semibold mb-4 text-rose-600">
              What's This All About?
            </h2>
            <p className="text-gray-700 mb-2">
              This template is like that friend who shows up at your place with beer and pizza when you're moving in. 
              It's got everything you need to start a React project without the usual three hours of configuration hell.
            </p>
            <p className="text-gray-700 mb-2">
              I'm aiming to keep this template fresh and bug-free. 
              Consider it a living project—if React or Tailwind makes a breaking change, I'll be here, crying and updating the template so you don't have to.
            </p>
            <div className="mt-6 bg-rose-50 p-4 rounded-lg">
              <h3 className="font-medium text-rose-600 mb-2">What's Inside:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>React 19 (yes, the cutting edge one)</li>
                <li>Tailwind CSS 4 (utility classes for days)</li>
                <li>React Router (because we're not savages)</li>
                <li>A solid folder structure (trust me, your future self will thank me)</li>
                <li>i18n support (for when your app gets famous internationally)</li>
                <li>Some basic component examples (so you're not starting with an empty void)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white  rounded-lg p-6 border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0">
            <h2 className="text-2xl font-semibold mb-4 text-rose-600">
              How To Use This Thing
            </h2>
            <p className="text-gray-700 mb-4">
              It's surprisingly simple, even for those of us who regularly forget where we put our coffee while actively drinking it:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Clone it, steal it, fork it—whatever floats your boat</li>
              <li>Run <code className="bg-gray-100 px-1 py-0.5 rounded">npm install</code> (or yarn if you're fancy)</li>
              <li>Start building your next million-dollar idea with <code className="bg-gray-100 px-1 py-0.5 rounded">npm run dev</code></li>
              <li>Customize the colors in <code className="bg-gray-100 px-1 py-0.5 rounded">tailwind.config.js</code> (may I suggest more pink?)</li>
              <li>Replace this page with something about your actual project</li>
              <li>Profit! (Results not guaranteed, terms and conditions apply)</li>
            </ol>
            <div className="mt-6 text-center">
              <Link to="/" className="text-rose-600 hover:text-rose-800 font-medium">
                Back to the fancy home page →
              </Link>
            </div>
          </div>

          {/* WTFPL License Section */}
          <div className=" mt-8 bg-white text-black rounded-lg p-6 border-4 border-l-rose-600 border-t-0 border-r-0 border-b-0">
            <h2 className="text-2xl font-semibold mb-4 text-rose-400">
              License: Do What The F*ck You Want
            </h2>
            <div className="border border-gray-700 rounded-lg p-4 mb-4 font-mono text-sm">
              <p className="mb-2">WTFPL - Do What The F*ck You Want To Public License</p>
              <p className="mb-4">Version 2, December 2004</p>
              <p className="mb-2">Copyright (C) 2024 Jaiki</p>
              <p className="mb-4">Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.</p>
              <p className="font-bold mb-4">DO WHAT THE F*CK YOU WANT TO PUBLIC LICENSE</p>
              <p>TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION:</p>
              <p className="font-bold">0. You just DO WHAT THE F*CK YOU WANT TO.</p>
            </div>
            <p className="text-gray-700 mb-4">
              In plain English: I made this template to make my life (and hopefully yours) easier. Take it. Use it. Modify it. 
              Sell it. Print it and make paper airplanes out of it. Put your name on it. I don't care.
            </p>
            <p className="text-gray-700">
              Just promise you'll use it to build something cool, and if you happen to make millions, maybe buy me a coffee. Or don't. 
              That's the beauty of this license—you can do whatever the f*ck you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;