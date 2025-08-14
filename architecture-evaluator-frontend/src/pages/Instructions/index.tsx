import React from 'react';
import { FaArrowLeft, FaLayerGroup, FaChartLine, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Instructions: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-full py-8 px-4 bg-gradient-to-br from-background-light to-swamp-100 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 mb-4 text-primary hover:text-primary-dark transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold text-primary mb-4 drop-shadow-lg">
                            User Guide - ArchEv
                        </h1>
                        <p className="text-lg text-gray-dark italic">
                            July 2025
                        </p>
                    </div>
                </div>

                {/* Introduction */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 mb-8 border border-gray-border">
                    <p className="text-lg text-gray-dark leading-relaxed">
                        This manual is intended for people visiting the architecture evaluation application for the first time.
                        Here you'll find a brief introduction to the layered monolithic architecture model, an explanation of
                        the metrics used in the analysis, and a visual guide on how to interpret the results displayed in the interface.
                    </p>
                </div>

                {/* Architecture Section */}
                <div className="bg-gradient-to-r from-primary/10 to-bright-turquoise-100/50 backdrop-blur rounded-2xl shadow-xl p-8 mb-8 border border-gray-border">
                    <div className="flex items-center gap-3 mb-6">
                        <FaLayerGroup className="text-3xl text-primary" />
                        <h2 className="text-3xl font-bold text-primary">
                            INTRODUCTION TO LAYERED ARCHITECTURE
                        </h2>
                    </div>

                    <p className="text-lg text-gray-dark mb-6 leading-relaxed">
                        The tool identifies and represents the structure of the analyzed application based on the
                        typical separation of a layered monolithic architecture:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-3">Controllers:</h3>
                            <p className="text-gray-dark">
                                Responsible for receiving requests and coordinating responses.
                            </p>
                        </div>

                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-3">Services:</h3>
                            <p className="text-gray-dark">
                                Contain the main business logic of the application.
                            </p>
                        </div>

                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-3">Repositories:</h3>
                            <p className="text-gray-dark">
                                Manage data access from files or databases.
                            </p>
                        </div>

                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-3">Entities:</h3>
                            <p className="text-gray-dark">
                                Represent the data structures used by the other layers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="bg-gradient-to-r from-bright-turquoise-100/50 to-primary/10 backdrop-blur rounded-2xl shadow-xl p-8 mb-8 border border-gray-border">
                    <div className="flex items-center gap-3 mb-6">
                        <FaChartLine className="text-3xl text-primary" />
                        <h2 className="text-3xl font-bold text-primary">
                            METRICS CALCULATED BY THE TOOL
                        </h2>
                    </div>

                    <p className="text-lg text-gray-dark mb-6 leading-relaxed">
                        The application automatically analyzes the uploaded source code and generates various
                        quality metrics that allow evaluating the maintainability of classes. These are:
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-3">
                                Cyclomatic Complexity
                            </h3>
                            <p className="text-gray-dark leading-relaxed">
                                Indicates the number of independent logical paths in a code block.
                                A high value suggests that the class or method has many conditional decisions
                                and could be difficult to understand or maintain.
                            </p>
                        </div>

                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-3">
                                Cohesion (LCOM5)
                            </h3>
                            <p className="text-gray-dark leading-relaxed">
                                Measures how much the methods of a class collaborate with each other. A value close to 0
                                indicates high cohesion (methods work on the same data), while a value close to 1
                                suggests low cohesion (each method does different things).
                            </p>
                        </div>

                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-3">
                                Instability (I)
                            </h3>
                            <p className="text-gray-dark leading-relaxed">
                                Instability reflects how dependent a component is on others. The closer to 1,
                                the higher the risk that external changes will affect its functioning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visual Legend Section */}
                <div className="bg-gradient-to-r from-swamp-100 to-background-light backdrop-blur rounded-2xl shadow-xl p-8 mb-8 border border-gray-border">
                    <div className="flex items-center gap-3 mb-6">
                        <FaEye className="text-3xl text-primary" />
                        <h2 className="text-3xl font-bold text-primary">
                            LEGEND AND VISUAL REPRESENTATION OF METRICS
                        </h2>
                    </div>

                    <p className="text-lg text-gray-dark mb-6 leading-relaxed">
                        To facilitate visual interpretation of results, the application uses different
                        graphical effects. The three main ones are explained below:
                    </p>

                    <div className="space-y-8">
                        {/* Color Section */}
                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-4">
                                Color: Cyclomatic Complexity
                            </h3>
                            <p className="text-gray-dark mb-4 leading-relaxed">
                                Each class or component is shown with a background color representing its method
                                with the highest complexity level:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🟩</div>
                                    <div className="font-bold text-green-700">Green</div>
                                    <div className="text-sm text-green-600">Low (1 to 10)</div>
                                </div>
                                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🟨</div>
                                    <div className="font-bold text-yellow-700">Yellow</div>
                                    <div className="text-sm text-yellow-600">Medium (10 to 20)</div>
                                </div>
                                <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🟧</div>
                                    <div className="font-bold text-orange-700">Orange</div>
                                    <div className="text-sm text-orange-600">High (20 to 40)</div>
                                </div>
                                <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🟥</div>
                                    <div className="font-bold text-red-700">Red</div>
                                    <div className="text-sm text-red-600">Very High (40+)</div>
                                </div>
                            </div>
                        </div>

                        {/* Shape Section */}
                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-4">
                                Shape: Cohesion (LCOM5)
                            </h3>
                            <p className="text-gray-dark mb-4 leading-relaxed">
                                The level of visual deformation in the boxes indicates the LCOM5 value:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-8 bg-primary rounded border-2 border-primary-dark"></div>
                                    <p className="text-gray-dark">
                                        <span className="font-bold">Well-defined rectangular shape:</span> high cohesion (LCOM5 close to 0)
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-8 bg-primary rounded border-2 border-primary-dark transform skew-x-12 skew-y-3"></div>
                                    <p className="text-gray-dark">
                                        <span className="font-bold">Distorted or irregular shape:</span> low cohesion (LCOM5 close to 1)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Vibration Section */}
                        <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-bright-turquoise-600 mb-4">
                                Vibration: Instability (I)
                            </h3>
                            <p className="text-gray-dark mb-4 leading-relaxed">
                                Classes or "boxes" will vibrate with variable intensity depending on instability:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                                    <p className="text-gray-dark">
                                        <span className="font-bold">I = 0:</span> the entity is completely stable; it doesn't depend on others, but others depend on it.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-primary rounded-full animate-bounce"></div>
                                    <p className="text-gray-dark">
                                        <span className="font-bold">I = 1:</span> the entity is completely unstable; it depends on many others, but none depend on it.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                                    <p className="text-gray-dark">
                                        <span className="font-bold">0 &lt; I &lt; 1:</span> indicates an intermediate degree of structural stability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/load')}
                        className="bg-gradient-to-r from-primary to-bright-turquoise-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                    >
                        Start Analyzing My Project!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
