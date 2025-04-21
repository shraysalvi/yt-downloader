// src/components/Privacy.jsx

import React from "react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#05051E]">
            <div className="max-w-4xl mx-auto px-4 sm:py-40 py-30">
                {/* Header */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">Privacy Policy</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mb-2"></div>
                </div>
                <p className="text-base text-white/70 mb-12">Last updated April 20, 2025</p>

                {/* Intro */}
                <div className="mb-16">
                    <p className="text-lg md:text-xl mb-6 text-white/70 leading-relaxed">
                        This Privacy Notice for Eazy‑dl ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
                    </p>
                    <ul className="space-y-4 mb-8 text-white/70">
                        <li className="flex items-start text-white/70">
                            <span className="text-purple-400 mr-2">•</span>
                            <span>
                                Visit our website at
                                <a
                                    href="https://eazy-dl.com"
                                    className="underline text-white hover:text-opacity-80 transition-all ml-1 whitespace-nowrap"
                                >
                                    https://eazy-dl.com
                                </a>, or any website of ours that links to this Privacy Notice
                            </span>
                        </li>

                        <li className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            Use Eazy‑dl. Eazy‑dl is a free, fast, and reliable YouTube video downloader created with simplicity in mind. We understand the frustration of complex interfaces, annoying ads, and unnecessary signups that plague most video downloading tools.
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            Engage with us in other related ways, including any sales, marketing, or events
                        </li>
                    </ul>
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                        Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:hello@eazy-dl.com" className="underline text-white hover:text-opacity-80 transition-all">hello@eazy-dl.com</a>.
                    </p>
                </div>

                {/* Summary */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-8 text-white">Summary of Key Points</h2>
                    <ul className="space-y-8 text-white/70">
                        {[
                            "What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.",
                            "Do we process any sensitive personal information? Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions. We do not process sensitive personal information.",
                            "Do we collect any information from third parties? We do not collect any information from third parties.",
                            "How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.",
                            "In what situations and with whom do we share personal information? We may share information in specific situations and with specific third parties.",
                            "What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                                <span className="text-purple-400 mr-3 mt-1">▹</span>
                                <span className="flex-1">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Table of Contents */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-8 text-white">Table of Contents</h2>
                    <ol className="grid md:grid-cols-2 gap-4 text-white/70">
                        {[
                            "What information do we collect?",
                            "How do we process your information?",
                            "When and with whom do we share your personal information?",
                            "Do we use cookies and other tracking technologies?",
                            "How long do we keep your information?",
                            "Do we collect information from minors?",
                            "What are your privacy rights?",
                            "Controls for Do-Not-Track features",
                            "Do we make updates to this notice?",
                            "How can you contact us about this notice?",
                            "How can you review, update, or delete the data we collect from you?"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                                <span className="text-purple-400 mr-3">{index + 1}.</span>
                                {item}
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Detailed Sections */}
                <div className="space-y-16">
                    {/* Section 1 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">1. What information do we collect?</h3>
                        <div className="space-y-6 text-white/70">
                            <p>
                                <strong className="text-white">Personal information you disclose to us</strong><br />
                                We collect personal information that you voluntarily provide to us when you express interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                            </p>
                            <p>
                                <strong className="text-white">Sensitive Information</strong><br />
                                We do not process sensitive information.
                            </p>
                            <p>
                                <strong className="text-white">Information automatically collected</strong><br />
                                Some information — such as your IP address and browser/device characteristics — is collected automatically when you visit our Services. This information helps maintain security and operation of our Services, and for internal analytics.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">2. How do we process your information?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                            <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    To respond to user inquiries and offer support
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    To provide and improve our Services
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    To ensure security and prevent fraud
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    To comply with legal obligations
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">3. When and with whom do we share your personal information?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    Business Transfers: During mergers, acquisitions, or asset sales
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-2 mt-1">•</span>
                                    With service providers and third parties assisting our operations
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">4. Do we use cookies and other tracking technologies?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
                            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
                            <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences).</p>
                            <p>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                            <div className="mt-4">
                                <strong className="text-white">Google Analytics</strong>
                                <p className="mt-2">
                                    We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" className="underline text-white hover:text-opacity-80">Google's opt-out page</a>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">5. How long do we keep your information?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
                            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">6. Do we collect information from minors?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
                            <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services.</p>
                            <p>If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:hello@eazy-dl.com" className="underline text-white hover:text-opacity-80">hello@eazy-dl.com</a>.</p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">7. What are your privacy rights?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
                            <p><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "How can you contact us about this notice?" below.</p>
                            <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                            <p>If you have questions or comments about your privacy rights, you may email us at <a href="mailto:hello@eazy-dl.com" className="underline text-white hover:text-opacity-80">hello@eazy-dl.com</a>.</p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">8. Controls for Do-Not-Track features</h3>
                        <div className="space-y-6 text-white/70">
                            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
                            <p>If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">9. Do we make updates to this notice?</h3>
                        <div className="space-y-6 text-white/70">
                            <p><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                            <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>
                            <p>We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">10. How can you contact us about this notice?</h3>
                        <div className="space-y-6 text-white/70">
                            <p>If you have questions or comments about this notice, you may email us at <a href="mailto:hello@eazy-dl.com" className="underline text-white hover:text-opacity-80">hello@eazy-dl.com</a>.</p>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-white">11. How can you review, update, or delete the data we collect from you?</h3>
                        <div className="space-y-6 text-white/70">
                            <p>You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
