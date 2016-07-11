(function () {
    var creativeStore = window.createCreativeStore();

    var PopCreative = React.createClass({
        onChangeUrl: function (e) {
            this.props.updateCreative(this.props.data.id, { url: e.target.value });
        },

        render: function() {
            return (
                <tr>
                    <td>
                        <img src="/img/creatives/popup.png"></img>
                    </td>
                    <td>
                        <input className="form-control" type="text" defaultValue="http://" onChange={this.onChangeUrl} />
                    </td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>{ this.props.data.showErrors && this.props.data.state == 'invalid' ? <div className="alert alert-danger"><em className="fa fa-exclamation-triangle" aria-hidden="true"></em> {this.props.data.reason}</div> : ''}</td>
                    <td>
                        <button className="remove btn btn-danger" title="Remove this banner" onClick={this.props.removeCreative.bind(null, this.props.data.id)}>
                            <em className="fa fa-trash" aria-hidden="true"></em>
                        </button>
                    </td>
                </tr>
            );
        }
    });


    var ContentCreative = React.createClass({
        onChangeContent: function (e) {
            this.props.updateCreative(this.props.data.id, { content: e.target.value });
        },

        onChangeSize: function (e) {
            this.props.updateCreative(this.props.data.id, { size: e.target.value });
        },

        onChangeType: function (e) {
            this.props.updateCreative(this.props.data.id, { type: e.target.value.toLowerCase() });
        },

        getAllowedSizes: function () {
            return _.map(this.props.allowedSizes, function (size) {
                return <option key={size} value={size}>{size}</option>;
            });
        },
        shouldShowWarning: function () {
            var content = this.props.data.content;

            if (content && this.props.data.type.toLowerCase() == 'javascript') {
                return content.trim().charAt(0) == '<';
            }

            return false;
        },

        render: function() {
            return (
                <tr>
                    <td>
                        <img src={'/img/creatives/content-' + this.props.data.type.toLowerCase() + '.png'}></img>
                        <select style={{verticalAlign: 'top'}} name="type" onChange={this.onChangeType}>
                            <option>HTML</option>
                            <option>Javascript</option>
                        </select>
                    </td>
                    <td>
                        <textarea className="form-control" rows="7" cols="40" onChange={this.onChangeContent} onBlur={this.onFocusLost}></textarea>
                        { this.shouldShowWarning() ? <div className="alert alert-warning" role="alert">It appears that you are uploading an HTML banner instead of Javascript, please change the content type to HTML.</div> : false}
                        <span className="clicktrackinginfo">Use the macro <code>${'{CLICK_URL}'}</code> or <code>${'{CLICK_URL_ENC}'}</code> to enable click tracking</span>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                        <select name="dimensions" onChange={this.onChangeSize}>
                            <option>Choose one</option>
                            {this.getAllowedSizes()}
                        </select>
                    </td>
                    <td>{ this.props.data.showErrors && this.props.data.state == 'invalid' ? <div className="alert alert-danger"><em className="fa fa-exclamation-triangle" aria-hidden="true"></em> {this.props.data.reason}</div> : ''}</td>
                    <td>
                        <button className="remove btn btn-danger" title="Remove this banner" onClick={this.props.removeCreative.bind(null, this.props.data.id)}>
                            <em className="fa fa-trash" aria-hidden="true"></em>
                        </button>
                    </td>
                </tr>
            );
        }
    });


    var UrlCreative = React.createClass({
        onChangeUrl: function (e) {
            this.props.updateCreative(this.props.data.id, { url: e.target.value });
        },

        onChangeSize: function (e) {
            this.props.updateCreative(this.props.data.id, { size: e.target.value });
        },

        onChangeType: function (e) {
            this.props.updateCreative(this.props.data.id, { type: e.target.value });
        },

        getAllowedSizes: function () {
            return _.map(this.props.allowedSizes, function (size) {
                return <option key={size} value={size}>{size}</option>;
            });
        },

        render: function() {
            return (
                <tr>
                    <td>
                        <img src={'/img/creatives/url-' + this.props.data.type.toLowerCase() + '.png'}></img>
                        <select style={{verticalAlign: 'top'}} name="type" onChange={this.onChangeType}>
                            <option value="html">iFrame</option>
                            <option value="js">Javascript</option>
                        </select>
                    </td>
                    <td>
                        <input className="form-control" type="text" defaultValue="http://" onChange={this.onChangeUrl} />
                        <span className="clicktrackinginfo">Use the macro <code>${'{CLICK_URL}'}</code> or <code>${'{CLICK_URL_ENC}'}</code> to enable click tracking</span>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                        <select name="dimensions" onChange={this.onChangeSize}>
                            <option>Choose one</option>
                            {this.getAllowedSizes()}
                        </select>
                    </td>
                    <td>{ this.props.data.showErrors && this.props.data.state == 'invalid' ? <div className="alert alert-danger"><em className="fa fa-exclamation-triangle" aria-hidden="true"></em> {this.props.data.reason}</div> : ''}</td>
                    <td>
                        <button className="remove btn btn-danger" title="Remove this banner" onClick={this.props.removeCreative.bind(null, this.props.data.id)}>
                            <em className="fa fa-trash" aria-hidden="true"></em>
                        </button>
                    </td>
                </tr>
            );
        }
    });

    var ImageCreative = React.createClass({

        onChangeClickUrl: function (e) {
            this.props.updateCreative(this.props.data.id, { clickUrl: e.target.value });
        },

        onChangeMopupText: function (e) {
            this.props.updateCreative(this.props.data.id, { mopup: e.target.value });
        },

        _isInvalidCreative: function () {
            return this.props.data.permanentlyInvalid;
        },

        _renderInput: function () {
            if (this._isInvalidCreative()) {
                return this.props.data.reason;
            }

            if (this.props.data.state === 'invalid' && this.props.data.showErrors === true) {
                return (
                    <div className="form-group has-danger">
                        <input ref="clickUrl" type="text" className="clickurl form-control form-control-danger" aria-describedby="inputError" defaultValue="http://" value={this.props.data.clickUrl} name="clickurl" onChange={this.onChangeClickUrl} />
                        <span id="inputError" className="sr-only">(error)</span>
                        { this.props.mopupAllowed != -1 ? <textarea ref="mopup" className="mopuptext form-control default" type="text" placeholder="Optional: place mopup text here, leave empty for regular banner campaign" value={this.props.data.mopup} name="mopup" onChange={this.onChangeMopupText} /> : '' }
                    </div>
                );
            }

            return (
                <div className="form-group">
                    <input ref="clickUrl" className="clickurl form-control default" type="text" defaultValue="http://" value={this.props.data.clickUrl} name="clickurl" onChange={this.onChangeClickUrl} />
                    { this.props.mopupAllowed != -1 ? <textarea ref="mopup" className="mopuptext form-control default" type="text" placeholder="Optional: place mopup text here, leave empty for regular banner campaign" value={this.props.data.mopup} name="mopup" onChange={this.onChangeMopupText} /> : '' }
                </div>
            );
        },

        render: function() {
            if (this._isInvalidCreative()) {
                var creativeStyle = 'declined';
            }

            return (
                <tr className={creativeStyle}>
                    <td className="preview">
                        <span className="pwrap"><img src={this.props.data.url} alt="Preview"></img></span>
                    </td>
                    <td className="filename">{ this.props.data.filename }</td>
                    <td>{ this.props.data.filesize }</td>
                    <td>{ this.props.data.size }</td>
                    <td>
                        {this._renderInput()}
                    </td>
                    <td>
                        <button className="remove btn btn-danger" title="Remove this banner" onClick={this.props.removeCreative.bind(null, this.props.data.id)}>
                            <em className="fa fa-trash" aria-hidden="true"></em>
                        </button>
                    </td>
                </tr>
            );
        }
    });

    var CreativeList = React.createClass({
        render: function() {
            var removeCreative = this.props.removeCreative;
            var updateCreative = this.props.updateCreative;

            if (this.props.creatives.length === 0) {
                return false;
            }

            allowedSizes = this.props.allowedSizes;
            allowedTypes = this.props.allowedTypes;

            var creatives = this.props.creatives.map(function (creative) {
                switch (creative.content_type) {
                    case 'file':
                        return <ImageCreative key={creative.id} data={creative} removeCreative={removeCreative} updateCreative={updateCreative} mopupAllowed={_.indexOf(allowedTypes, 'mopup')} />;
                    case 'url':
                        if (creative.type == 'popup') {
                            return <PopCreative key={creative.id} data={creative} removeCreative={removeCreative} updateCreative={updateCreative} />;
                        }
                        else {
                            return <UrlCreative key={creative.id} data={creative} removeCreative={removeCreative} updateCreative={updateCreative} allowedSizes={allowedSizes} />;
                        }
                    case 'content':
                        return <ContentCreative key={creative.id} data={creative} removeCreative={removeCreative} updateCreative={updateCreative} allowedSizes={allowedSizes} />;
                    default:
                        return <tr><td>Unknown Creative Type</td></tr>;
                }
            });
            return (
                <div className="table-responsive">
                    <table id="creatives" className="table nosort">
                    <thead><tr><th>Preview</th><th>Filename / URL</th><th>Filesize</th><th>Dimensions</th><th>Click URL</th><th>Remove</th></tr></thead>
                    <tbody>
                    {creatives}
                    </tbody>
                    </table>
                </div>
            );
        }
    });

    var DefaultUrl = React.createClass({
        update: function (e) {
            this.props.updateDefaultClickUrl(e.target.value);
        },

        render: function () {
            return (
                creativeStore.showDefault ?
                <div id="section-clickurl">
                    <div className="form-group">
                        <label htmlFor="clickurl">Default Click URL for all banners <span style={{fontWeight: 'normal'}}>(optional)</span></label>
                        <input id="clickurl" className="form-control" type="text" name="url" size="50" defaultValue="http://" onChange={this.update} />
                    </div>
                </div>
                : false
            );
        }
    });

    var UploadButtons = React.createClass({
        onUrlCreative: function (e) {
            this.props.addCreative({
                content_type: 'url',
                type: 'html'
            });
        },

        onContentCreative: function (e) {
            this.props.addCreative({
                content_type: 'content',
                type: 'html'
            });
        },

        onPopCreative: function (e) {
            this.props.addCreative({
                content_type: 'url',
                type: 'popup',
                size: '800x600'
            });

        },

        shouldShowButtonFor: function (type) {
            return _.indexOf(this.props.allowedTypes, type) != -1
        },

        render: function () {
            return (
                <p id="uploaders">
                { this.shouldShowButtonFor('file') ?
                    <a className="btn btn-primary btn-sm" href="javascript:void(0);" tabIndex="-1">
                        <em className="fa fa-plus" aria-hidden="true"></em> Add banner files
                        <input id="fileinput" name="file[]" type="file" multiple="multiple" accept="image/*" onChange={this.props.handleUpload} />
                    </a>
                : false}

                { this.shouldShowButtonFor('url') ?
                    <a className="btn btn-primary btn-sm" href="javascript:void(0);" onClick={this.onUrlCreative}>
                        <em className="fa fa-plus" aria-hidden="true"></em> Add a JS or iframe URL
                    </a>
                : false}

                { this.shouldShowButtonFor('content') ?
                    <a className="btn btn-primary btn-sm" href="javascript:void(0);" onClick={this.onContentCreative}>
                        <em className="fa fa-plus" aria-hidden="true"></em> Add a JS or HTML script
                    </a>
                : false}

                { this.shouldShowButtonFor('popup') ?
                    <a className="btn btn-primary btn-sm" href="javascript:void(0);" onClick={this.onPopCreative}>
                        <em className="fa fa-plus" aria-hidden="true"></em> Add a popup/popunder URL
                    </a>
                : false}

                { this.shouldShowButtonFor('file') ? 'or drag them to this window' : false }

                </p>
            );
        }
    });

    var WarningMessage = React.createClass({
        getClasses: function () {
            return "alert alert-" + this.props.type;
        },
        render: function () {
            return (
                <div>
                    { this.props.message ?
                        <div className={this.getClasses()} role="alert" dangerouslySetInnerHTML={{ __html: this.props.message}}></div>
                    : false}
                </div>
            );
        }
    });

    var CreativeControl = React.createClass({
        getInitialState: function() {
            return creativeStore.getState();
        },

        componentDidMount: function() {
            creativeStore.addChangeListener(this._onChange);
        },

        handleUpload: function (e) {
            creativeStore.handleUpload(e.target);
            e.target.value = "";
        },

        addFileCreative: function (file) {
            creativeStore.addFile(file);
        },

        addCreative: function (options) {
            creativeStore.add(options);
        },

        updateDefaultClickUrl: function (url) {
            creativeStore.setDefaultClickUrl(url);
        },

        updateCreative: function (id, values) {
            creativeStore.update(id, values);
        },

        removeCreative: function (id) {
            creativeStore.remove(id);
        },

        render: function () {
            return (
                <div>
                    <WarningMessage message={this.state.maxCreativesMessage} type={this.state.maxCreativesType} />
                    <DefaultUrl updateDefaultClickUrl={this.updateDefaultClickUrl} />
                    <UploadButtons allowedTypes={this.props.allowedTypes} handleUpload={this.handleUpload} addCreative={this.addCreative}/>
                    <CreativeList creatives={this.state.creatives} removeCreative={this.removeCreative} updateCreative={this.updateCreative} allowedSizes={this.props.allowedSizes} allowedTypes={this.props.allowedTypes} />
                </div>
            );
        },

        _onChange: function () {
            this.setState(creativeStore.getState());
        }
    });

    window.CreativeUploader =  function (options) {
        creativeStore.setValidSizes(options.sizes);
        creativeStore.setCreativesEndpoint(options.url);

        if (options.maxFileSize) {
            creativeStore.setMaxFileSize(options.maxFileSize);
        }

        if (options.onNewCreatives) {
            creativeStore.addNewCreativesListener(options.onNewCreatives);
        }

        if (options.maxCreatives) {
            creativeStore.setMaxCreatives(options.maxCreatives);
        }

        creativeStore.setMaxCreativesIsStrict(!!options.maxCreativesIsStrict);

        var control = React.render(
            <CreativeControl allowedSizes={options.sizes} allowedTypes={options.types}/>,
            document.getElementById(options.target)
        );

        return {
            store: function () {
                return creativeStore;
            }
        }
    };
})();
