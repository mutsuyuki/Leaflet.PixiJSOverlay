
    L.PixiJSOverlay =  L.Renderer.extend({

      initialize: function (pixiApplication, options) {
        L.Renderer.prototype.initialize.call(this,options);
        this._pixiApplication = pixiApplication;
      },

      getEvents: function () {
        var events = L.Renderer.prototype.getEvents.call(this);
        events.zoomstart = this._onZoomStart;
        events.resize = this._onResize;
        return events;
      },

      _initContainer: function () {
        this._container = L.DomUtil.create('div', 'pixijs-overlay')
        this._container.appendChild(this._pixiApplication.view);
      },

      _destroyContainer: function () {
        L.DomUtil.remove(this._container);
        L.DomEvent.off(this._container);
        delete this._container;
        delete this._canvasSize;
        this._pixiApplication.destroy();
      },

      _onZoomStart: function () {
        this._update();
      },

      _onResize: function(param) {
        this._pixiApplication.renderer.resize(param.newSize.x, param.newSize.y);
      },

      _update: function () {
        if (this._map._animatingZoom && this._bounds) {
          return;
        }

        L.Renderer.prototype._update.call(this);

        var b = this._bounds,
          size = b.getSize(),
          container = this._container;

        if (!this._canvasSize || !this._canvasSize.equals(size)) {
          this._canvasSize = size;
          this._pixiApplication.renderer.resize(size.x,size.y);
        }

        L.DomUtil.setPosition(container, b.min);
        this._pixiApplication.stage.position.set(-b.min.x, -b.min.y);
        this._pixiApplication.render();  // prevent flicker
        this.fire('update');
      }
    });

    // @factory L.pixiJSOverlay(pixiApplication:PIXI.Application)
    // Creates a PixiJSOverlay with the given arguments.
    L.pixiJSOverlay = function (pixiApplication, options) {
      return  new L.PixiJSOverlay(pixiApplication, options);
    };
