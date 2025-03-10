

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
            <header className="py-8">
                <nav className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">FakeApp</h1>
                    <div>
                        <a href="/login" className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded mr-2">
                            Login
                        </a>
                        <a href="/register" className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded">
                            Register
                        </a>
                    </div>
                </nav>
            </header>
            <section className="container mx-auto py-16">
                <div className="text-center">
                    <h2 className="text-5xl font-extrabold mb-4">Welcome to FakeApp</h2>
                    <p className="text-xl mb-8">
                        Experience an application built with passion and attention to detail. Enjoy stunning visuals, seamless navigation, and a user-friendly interface.
                    </p>
                    <a href="/register" className="bg-white text-indigo-500 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100">
                        Get Started
                    </a>
                </div>
            </section>
            <section className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                    <p className="text-lg">
                        To revolutionize digital experiences with innovative design and cutting-edge technology that empower users around the world.
                    </p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-4">Features</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>Innovative design</li>
                        <li>User-friendly interface</li>
                        <li>Seamless navigation</li>
                        <li>Responsive layouts</li>
                    </ul>
                </div>
            </section>
            <section className="container mx-auto py-16">
                <h3 className="text-4xl font-bold text-center mb-8">Testimonials</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="bg-white text-gray-800 p-6 rounded shadow-md max-w-sm">
                        <p>"FakeApp transformed the way I connect with technology. Truly a game-changer!"</p>
                        <p className="mt-4 text-right text-sm">- Alex Doe</p>
                    </div>
                    <div className="bg-white text-gray-800 p-6 rounded shadow-md max-w-sm">
                        <p>"A stellar blend of beauty and functionality. I recommend FakeApp to everyone."</p>
                        <p className="mt-4 text-right text-sm">- Jamie Doe</p>
                    </div>
                </div>
            </section>
            <footer className="bg-indigo-700 py-8 mt-16">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} FakeApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;