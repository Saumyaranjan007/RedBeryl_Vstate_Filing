import React from 'react'



const LLC = () => {
    return (

        <main class="my-5">
            <div class="container">
                <div id="wizard" role='application' className='wizard clearfix'>
                    <div className='steps clearfix'>
                        <ul className='tablist'>
                            <li role='tab' className='first current' aria-disabled="false" aria-selected='true'>
                                <a id="wizard-t-0" href="#wizard-h-0" aria-controls='wizard-p-0'>
                                    <div class="media">
                                        <div class="bd-wizard-step-icon"><i class="mdi mdi-account-outline"></i></div>
                                        <div class="media-body">
                                            <div class="bd-wizard-step-title">Personal Details</div>
                                            <div class="bd-wizard-step-subtitle">Step 1</div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <section>
                        <div class="content-wrapper">
                            <h4 class="section-heading">Enter your Personal details </h4>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="firstName" class="sr-only">First Name</label>
                                    <input type="text" name="firstName" id="firstName" class="form-control" placeholder="First Name" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="lastName" class="sr-only">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" class="form-control" placeholder="Last Name" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="phoneNumber" class="sr-only">Phone Number</label>
                                    <input type="text" name="phoneNumber" id="phoneNumber" class="form-control" placeholder="Phone Number" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="emailAddress" class="sr-only">Email Address</label>
                                    <input type="email" name="emailAddress" id="emailAddress" class="form-control" placeholder="Email Address" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <h3>
                        <div class="media">
                            <div class="bd-wizard-step-icon"><i class="mdi mdi-bank"></i></div>
                            <div class="media-body">
                                <div class="bd-wizard-step-title">Employ Details</div>
                                <div class="bd-wizard-step-subtitle">Step 2</div>
                            </div>
                        </div>
                    </h3>
                    <section>
                        <div class="content-wrapper">
                            <h4 class="section-heading">Enter your Employment details </h4>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="designation" class="sr-only">Designation</label>
                                    <input type="text" name="designation" id="designation" class="form-control" placeholder="Designation" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="department" class="sr-only">Department</label>
                                    <input type="text" name="department" id="department" class="form-control" placeholder="Department" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="employeeNumber" class="sr-only">Employee Number</label>
                                    <input type="text" name="employeeNumber" id="employeeNumber" class="form-control" placeholder="Employee Number" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="workEmailAddress" class="sr-only">Work Email Address</label>
                                    <input type="email" name="workEmailAddress" id="workEmailAddress" class="form-control" placeholder="Work Email Address" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <h3>
                        <div class="media">
                            <div class="bd-wizard-step-icon"><i class="mdi mdi-account-check-outline"></i></div>
                            <div class="media-body">
                                <div class="bd-wizard-step-title">Review </div>
                                <div class="bd-wizard-step-subtitle">Step 3</div>
                            </div>
                        </div>
                    </h3>
                    <section>
                        <div class="content-wrapper">
                            <h4 class="section-heading mb-5">Review your Details</h4>
                            <h6 class="font-weight-bold">Personal Details</h6>
                            <p class="mb-4"><span id="enteredFirstName">Cha</span> <span id="enteredLastName">Ji-Hun C</span> <br />
                                Phone: <span id="enteredPhoneNumber">+230-582-6609</span> <br />
                                Email: <span id="enteredEmailAddress">willms_abby@gmail.com</span></p>
                            <h6 class="font-weight-bold">Employment Details</h6>
                            <p class="mb-0"><span id="enteredDesignation">Junior Developer</span> - <span id="enteredDepartment">UI Development</span> <br />
                                Phone: <span id="enteredEmployeeNumber">JDUI36849</span> <br />
                                Email: <span id="enteredWorkEmailAddress">willms_abby@company.com</span></p>
                        </div>
                    </section>
                    <h3>
                        <div class="media">
                            <div class="bd-wizard-step-icon"><i class="mdi mdi-emoticon-outline"></i></div>
                            <div class="media-body">
                                <div class="bd-wizard-step-title">Submit</div>
                                <div class="bd-wizard-step-subtitle">Step 4</div>
                            </div>
                        </div>
                    </h3>
                    <section>
                        <div class="content-wrapper">
                            <h4 class="section-heading mb-5">Accept agreement and Submit</h4>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input" name="" id="" value="checkedValue" checked />
                                    I hereby declare that I had read all the <a href="#!">terms and conditions</a>  and all the details provided my me in this form are true.
                                </label>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>

    )
}

export default LLC