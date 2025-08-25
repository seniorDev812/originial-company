import Footer from "../components/footer";
import Header from "../components/header";
import Icon from "../components/ui/Icon";
import '../../../public/css/style.css';
import '../../../public/css/tailwind.css';
import ProductFilter from "../components/product/page";

export default function ProductPage() {
    return (
        <>
        
            <Header />
            <div className="block">
                <div id="smooth-wrapper" className="block">
                    <div id="smooth-content">
                      <main className="main-field home-animation">
                         <ProductFilter />
                        </main>
                        <Footer />
                    </div>
                </div>
                <div className="bg-overlay-general fixed left-0 top-0 z-[90] opacity-0 invisible duration-500 [&amp;.active]:opacity-100 [&amp;.active]:visible [&amp;.black]:bg-black/30 w-full h-full group"></div>

                <div className="cookie-box fixed top-auto bottom-[20px] right-[20px] left-[20px] mr-0 ml-auto w-fit max-w-[550px] md:max-w-full z-[200] duration-450 xs:w-full xs:left-0 xs:bottom-0 xs:right-0 bg-cookie p-[30px] rounded-[20px] xs:rounded-none translate-y-[150%] [&amp;.accepted]:opacity-0 [&amp;.accepted]:invisible [&amp;.accepted]:translate-y-[250%] sm:sm:max-h-[calc(100dvh-40px)] sm:scrollbar sm:scrollbar-w-[5px] sm:scrollbar-track-rounded-[5px] sm:scrollbar-thumb-rounded-[5px] sm:scrollbar-thumb-primary sm:scrollbar-track-primary/10 sm:overflow-x-hidden sm:overflow-y-auto accepted">
                    <div className="close close-cookie absolute right-[20px] top-[20px] cursor-pointer group/close">
                        <Icon
                            name="icon-cross"
                            className="group-hover/close:text-primary group-hover/close:rotate-90 text-white text-[14px] h-[14px] block leading-none duration-350"
                            size={14}
                        />
                    </div>
                    <div className="text-field text-white">
                        <div className="title font-medium text-[18px] mb-[15px]">Cookie Settings</div>
                        <div className="expo text-[14px] sm:text-[12px] text-white/50">On this website, we use cookies and similar functions to process device information and personal data. Processing serves the integration of content, external services, and third-party elements, statistical analysis/measurement, personalized advertising, and integration of social media. Depending on the function, data may be transferred to third parties and processed by them. This consent is optional, not necessary for the use of our website, and can be revoked at any time using the icon at the bottom left.</div>
                    </div>
                    <div className="split my-[20px] sm:my-[10px] bg-white/5 w-full h-[1px]"></div>
                    <div className="action-field flex items-center justify-between gap-[20px] sm:flex-col">
                        <button className="accept-cookie close-cookie button group/button w-full flex justify-center items-center gap-[20px] bg-primary px-[20px] hover:bg-secondary h-[45px] md:h-[50px] duration-350">
                            <div className="text text-[13px] text-white font-medium relative z-2 whitespace-nowrap duration-350">Accept Cookies</div>
                        </button>
                        <button className="close-cookie button group/button w-full flex justify-center items-center gap-[20px] bg-transparent px-[20px] h-[45px] md:h-[50px] duration-350 border border-solid border-primary">
                            <div className="text text-[13px] text-white/50 duration-350 font-medium relative z-2 whitespace-nowrap group-hover/button:text-white">Reject</div>
                        </button>
                    </div>
                    <div className="link-field mt-[30px]">
                        <a href="https://asirgroup.com/gdpr/" className="text-white/50 duration-350 hover:text-white underline text-[13px] font-medium">GDPR</a>
                        <span className="mx-[10px] text-black/50">|</span>
                    </div>
                </div>
            </div>
        </>
    )
}