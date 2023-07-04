import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';



const DisplayPlans = () => {

    const plansList = useSelector((state) => state.planReducer);
    const user = useSelector((state) => state.currentUserReducer)
    console.log(user)
    
  return (
    <div className='plans'>
        <h1 style={{ fontWeight: '400' }}>Plans</h1>
        <div className='plans-details'>
            {
                plansList === null ?
                <h1>Loading...</h1> :
                <>
                    {
                        plansList.filter(plans => plans?._id && user?.result?.plan !== plans?.plan).map(plans => (
                            <div key={plans?._id}>
                                <section className="articles">
                                <article>
                                <div className="article-wrapper">
                                    <div className="article-body">
                                        <h2>{plans.plan}</h2>
                                        <p>{plans.desc}</p>
                                        <p>Rs. {plans.price} / month</p>
                                        <Link to={`/Payment/${plans._id}`} className="direct" >Activate 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                            </section>
                            </div>
                            
                        ))
                    }
                </>
            }
            </div>
            </div>
        
  )
}

export default DisplayPlans
