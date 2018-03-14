class App extends React.Component {
    constructor() {
        super();
        this.state = {
            accountId: "",
            projectId: ""
        };
        if (localStorage.getItem("state")) {
            try {
                this.state = JSON.parse(localStorage.getItem("state"));
            } catch (e) {
                console.error(e);
            }
        }
    }

    componentDidMount() {
        if (!window.ENGAGE) {
            console.error("Engage Core Library is missing");
        }
        if (this.state.accountId && this.state.projectId) {
            ENGAGE.initialize(this.state.accountId, this.state.projectId);
        }
    }

    onInputChange = (data, value) => {
        let object = {};
        object[data] = value;
        this.setState(object);
    };

    initializeEngage = () => {
        if (!this.state.accountId || !this.state.projectId) {
            return alert("Please enter both account id and project id");
        }
        localStorage.setItem("state", JSON.stringify(this.state));

        /**
         * Initialize ENGAGE SDK
         *
         * This is the first step and should be done while bootstraping the application
         * Account ID and Project ID is passed while initializing, you can get the values
         * from project settings in Engage Dashboard
         */
        ENGAGE.initialize(this.state.accountId, this.state.projectId);
    };

    trackAnonymousUser = () => {
        /**
         * Engage can track the user behaviour as an anoymous user and later
         * when the user logs in, the anonymous session data is merged with the user session
         */
        ENGAGE.identify({
            status: "anonymous"
        });
    };

    userLogin = () => {
        /**
         * Identify current user with id 3707 and a
         * list of traits.
         *
         * Identify should be called everytime you bootstrap the application
         * so that Engage will be aware of the user context
         */
        let userId = 3707;
        ENGAGE.identify(userId, {
            name: "Arjun Komath",
            gender: "male",
            age: 25,
            status: "registered",
            email: "arjun.komath@diagnal.com",
            network: "Vodafone",
            order_valid_till: "2018-03-15"
        });

        // Trigger login event
        ENGAGE.onUserLogin(userId).track();
    };

    userSignup = () => {
        /**
         * Identify current user with id 3707 and a
         * list of traits.
         */
        let userId = 3707;
        ENGAGE.identify(userId, {
            name: "Arjun Komath",
            gender: "male",
            age: 25,
            status: "registered",
            email: "arjun.komath@diagnal.com",
            network: "Vodafone",
            order_valid_till: "2018-03-15"
        });

        // Trigger signup event
        ENGAGE.onUserRegistered(userId).track();
    };

    userLogout = () => {
        let userId = 3707;
        // Trigger signup event
        ENGAGE.onUserLogout(userId).track();
        /**
         *  Remove user context from Engage
         *
         *  After calling shutdown, Engage will not track any events
         *  Also, campaigns will not be triggered as Engage is unaware of the user context
         */
        ENGAGE.shutdown();
    };

    contentView = () => {
        ENGAGE.onContentView("media-123") // Unique id to identify the content / media
            .putTitle("Avengers") // Content title
            .putType("movie") // Content type
            .track();
    };

    contentPlayback = action => {
        switch (action) {
            case "start":
                ENGAGE.onPlaybackStarted("media-123") // Unique id to identify the content / media
                    .putContentTitle("Avengers") // Content title
                    .putContentType("trailer") // Content type
                    .track();
                break;
            case "stop":
                ENGAGE.onPlaybackStopped("media-123") // Unique id to identify the content / media
                    .putContentTitle("Avengers") // Content title
                    .putContentType("trailer") // Content type
                    .track();
                break;
            case "resume":
                ENGAGE.onPlaybackResumed("media-123") // Unique id to identify the content / media
                    .putContentTitle("Avengers") // Content title
                    .putContentType("trailer") // Content type
                    .track();
                break;
        }
    };

    trackCheckout = () => {
        /**
         * Track initiate checkout
         */
        ENGAGE.onProductSelected("monthly-pack")
            .putProductTitle("30 Days Premium Access")
            .putProductType("subscription")
            .putProductPrice("3.99")
            .putCurrency("USD")
            .track();
    };

    trackCheckout = () => {
        /**
         * Track checkout success
         */
        ENGAGE.onProductCheckoutSuccess("monthly-pack")
            .putProductTitle("30 Days Premium Access")
            .putProductType("subscription")
            .putProductPrice("3.99")
            .putCurrency("USD")
            .track();
    };

    render() {
        return (
            <div className="container">
                <h2>
                    <b>DIAGNAL ENGAGE DEMO</b>
                </h2>
                <hr />
                <p>This is a sample single page application for demonstrating integration with DIAGNAL ENGAGE.</p>

                <h4 style={{ marginTop: 40 }}>ENGAGE Configuration</h4>

                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Account ID
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Account ID" onChange={evt => this.onInputChange("accountId", evt.target.value)} value={this.state.accountId} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Project ID
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Project ID" onChange={evt => this.onInputChange("projectId", evt.target.value)} value={this.state.projectId} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.initializeEngage}>
                    Initialize Engage SDK
                </button>

                <h4 style={{ marginTop: 40 }}>Tracking User</h4>
                <p>
                    Whenever user context changes via login, signup, logout etc, we use the identify method to pass the information to Engage.<br />
                    It is also possible to track an anonymous user via Engage.
                </p>

                <button className="btn btn-primary" onClick={this.trackAnonymousUser}>
                    Track Anonymous
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={this.userLogin}>
                    Track Login
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={this.userSignup}>
                    Track Signup
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={this.userLogout}>
                    Track Logout
                </button>

                <h4 style={{ marginTop: 20 }}>Tracking Content Events</h4>
                <button className="btn btn-primary" onClick={this.contentView}>
                    Track Content View
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={() => this.contentPlayback("start")}>
                    Track Content Playback Start
                </button>

                <h4 style={{ marginTop: 20 }}>Tracking Purchase</h4>
                <button className="btn btn-primary" onClick={this.trackCheckout}>
                    Track Checkout
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={this.trackCheckoutSuccess}>
                    Track Successful Purchase
                </button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("container"));
