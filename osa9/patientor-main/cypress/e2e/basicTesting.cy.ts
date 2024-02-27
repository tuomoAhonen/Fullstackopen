describe(`Testing Patientor front-end`, () => {
	it(`Check, that back-end/API is online`, () => {
		cy.origin(`https://full-stack-open-patientor-backend.vercel.app/api/ping`, () => {
			cy.visit(`/`);
			cy.contains(`pong`);
		});
	});

	it(`Check, that API's /patient status ok and has body length`, () => {
		cy.origin(`https://full-stack-open-patientor-backend.vercel.app/api/patients`, () => {
			cy.request(`GET`, `/`).then((response) => {
				expect(response.status).to.equal(200);
				expect(response.body).length.to.be.greaterThan(0);
			});
		});
	});

	/* does not work
	it(`Check, that API has content`, () => {
		cy.origin(`https://full-stack-open-patientor-backend.vercel.app/api/patients`, () => {
			cy.visit(`/`);
			cy.contains(/id/gm);
			cy.contains(/name/gm);
			cy.contains(/dateOfBirth/gm);
			cy.contains(/gender/gm);
			cy.contains(/occupation/gm);
			cy.contains(/Matti Luukkainen/gm);
		});
	});
	*/

	it(`Visiting lading page and checking that it has the content displayed`, () => {
		cy.visit(`/`);

		// titles
		cy.get(`h3`).contains(`Patientor`);
		cy.get(`h5`).contains(`Patient list`);

		// buttons
		cy.get(`a`).contains(`Home`);
		cy.get(`button`).contains(`Add New Patient`);

		// table and it's content
		cy.get(`[data-testid="patients-table"]`).should(`be.visible`);

		cy.get(`[data-testid="patients-table"]`).contains(`Name`);
		cy.get(`[data-testid="patients-table"]`).contains(`Gender`);
		cy.get(`[data-testid="patients-table"]`).contains(`Occupation`);
		cy.get(`[data-testid="patients-table"]`).contains(`Health Rating`);

		cy.get(`[data-testid="patients-table"]`).contains(`John McClane`);
		cy.get(`[data-testid="patients-table"]`).contains(`Martin Riggs`);
		cy.get(`[data-testid="patients-table"]`).contains(`Hans Gruber`);
		cy.get(`[data-testid="patients-table"]`).contains(`Dana Scully`);
		cy.get(`[data-testid="patients-table"]`).contains(`Matti Luukkainen`);

		cy.get(`[data-testid="patients-table"]`).contains(`male`);
		cy.get(`[data-testid="patients-table"]`).contains(`female`);
		cy.get(`[data-testid="patients-table"]`).contains(`other`);

		cy.get(`[data-testid="patients-table"]`).contains(`New york city cop`);
		cy.get(`[data-testid="patients-table"]`).contains(`Cop`);
		cy.get(`[data-testid="patients-table"]`).contains(`Technician`);
		cy.get(`[data-testid="patients-table"]`).contains(`Forensic Pathologist`);
		cy.get(`[data-testid="patients-table"]`).contains(`Digital evangelist`);

		cy.get(`[class="health-bar"]`).should(`be.visible`);
	});

	it(`Visit patient's profile and check information`, () => {
		cy.visit(`/`);
		cy.get(`a`).contains(`Matti Luukkainen`).click();

		cy.get(`h5`).contains(`Matti Luukkainen`);
		cy.get(`[data-testid="patient-info"]`).contains(`Gender: `);
		cy.get(`[data-testid="patient-info"]`).contains(`male`);
		cy.get(`[data-testid="patient-info"]`).contains(`SSN: `);
		cy.get(`[data-testid="patient-info"]`).contains(`090471-8890`);
		cy.get(`[data-testid="patient-info"]`).contains(`Birthdate: `);
		cy.get(`[data-testid="patient-info"]`).contains(`1971-04-09`);

		cy.get(`[data-testid="patient-entries"]`).contains(`Entries`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Health check`);
		cy.get(`[data-testid="patient-entries"]`).contains(`2019-05-01`);
		cy.get(`svg`).should(`be.visible`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Digital overdose, very bytestatic. Otherwise healthy.`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Diagnose by `);
		cy.get(`[data-testid="patient-entries"]`).contains(`Dr Byte House`);
	});

	// from this, you could test different entries and so on...
	it(`Add new entry for patient`, () => {
		cy.visit(`/`);
		cy.get(`a`).contains(`Matti Luukkainen`).click();
		cy.get(`[data-testid="patient-entries"]`).contains(`Hospital`).should(`not.exist`);

		cy.get(`button`).contains(`Add New Entry`).click();
		cy.get(`[data-testid='addNewEntry']`).should(`exist`);
		cy.get(`[id="type"]`).contains(`HealthCheck`).click();
		cy.get(`li`).contains(`Hospital`).click();
		cy.get(`[id="date"]`).type(`2023-11-20`);
		cy.get(`[id="description"]`).type(`Broken arm from biking accident`);
		cy.get(`[id="specialist"]`).type(`Mikko Mallikas`);
		cy.get(`button`).contains(`Add`).click();
		cy.get(`[type="checkbox"]`).click();
		cy.get(`[id="criteria"]`).type(`Treated arm`);
		cy.get(`[id="dischargedate"]`).type(`2023-11-20`);
		cy.get(`button`).contains(`Submit`).click();
		cy.get(`[data-testid='addNewEntry']`).should(`not.exist`);

		cy.get(`[data-testid="patient-entries"]`).contains(`2023-11-20`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Broken arm from biking accident`);
		cy.get(`[data-testid="patient-entries"]`).contains(`M24.2`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Mikko Mallikas`);
		cy.get(`[data-testid="patient-entries"]`).contains(`Discharged: `);
		cy.get(`[data-testid="patient-entries"]`).contains(` on criteria `);
		cy.get(`[data-testid="patient-entries"]`).contains(`Treated arm`);
	});

	it(`Cancel new entry for patient`, () => {
		cy.visit(`/`);
		cy.get(`a`).contains(`Matti Luukkainen`).click();

		cy.get(`button`).contains(`Add New Entry`).click();
		cy.get(`[data-testid='addNewEntry']`).should(`exist`);

		cy.get(`button`).contains(`Cancel`).click();
		cy.get(`[data-testid='addNewEntry']`).should(`not.exist`);
	});

	it(`Add new patient`, () => {
		cy.visit(`/`);
		cy.get(`[data-testid="addNewPatient"]`).contains(`Add New Patient`).click();
		cy.get(`[data-testid="addPatientModal"]`).should(`exist`);

		cy.get(`[id="name"]`).type(`Test Person`);
		cy.get(`[id="ssn"]`).type(`000000-1234`);
		cy.get(`[id="birthdate"]`).type(`2000-01-01`);
		cy.get(`[id="occupation"]`).type(`Werk`);
		cy.get(`[id="gender"]`).contains(`other`).click();
		cy.get(`[id="male"]`).contains(`male`).click();
		cy.get(`[data-testid="submitPatient"]`).contains(`Add`).click();

		cy.get(`[data-testid="addPatientModal"]`).should(`not.exist`);
		cy.get(`[data-testid="patients-table"]`).contains(`Test Person`);
		cy.get(`[data-testid="patients-table"]`).contains(`Werk`);
	});

	it(`Cancel new patient`, () => {
		cy.visit(`/`);
		cy.get(`[data-testid="addNewPatient"]`).contains(`Add New Patient`).click();
		cy.get(`[data-testid="addPatientModal"]`).should(`exist`);

		cy.get(`button`).contains(`Cancel`).click();
		cy.get(`[data-testid="addPatientModal"]`).should(`not.exist`);
	});
});
