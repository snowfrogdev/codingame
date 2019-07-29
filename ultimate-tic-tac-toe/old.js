!(function(t) {
  var e = {};
  function __webpack_require__(a) {
    if (e[a]) return e[a].exports;
    var r = (e[a] = {
      i: a,
      l: !1,
      exports: {}
    });
    return t[a].call(r.exports, r, r.exports, __webpack_require__), (r.l = !0), r.exports;
  }
  (__webpack_require__.m = t),
    (__webpack_require__.c = e),
    (__webpack_require__.d = function(t, e, a) {
      __webpack_require__.o(t, e) ||
        Object.defineProperty(t, e, {
          configurable: !1,
          enumerable: !0,
          get: a
        });
    }),
    (__webpack_require__.r = function(t) {
      Object.defineProperty(t, '__esModule', {
        value: !0
      });
    }),
    (__webpack_require__.n = function(t) {
      var e =
        t && t.__esModule
          ? function getDefault() {
              return t.default;
            }
          : function getModuleExports() {
              return t;
            };
      return __webpack_require__.d(e, 'a', e), e;
    }),
    (__webpack_require__.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (__webpack_require__.p = ''),
    __webpack_require__((__webpack_require__.s = './src/main.ts'));
})({
  './node_modules/macao/dist/macao.es5.js': function(t, e, a) {
    'use strict';
    a.r(e),
      a.d(e, 'Macao', function() {
        return w;
      });
    !(function() {
      function DefaultGameRules(t) {
        (this.generateActions = t.generateActions),
          (this.applyAction = t.applyAction),
          (this.stateIsTerminal = t.stateIsTerminal),
          (this.calculateReward = t.calculateReward);
      }
      Object.defineProperty(DefaultGameRules.prototype, 'generateActions', {
        get: function() {
          return this.generateActions_;
        },
        set: function(t) {
          if ('function' != typeof t || 1 !== t.length)
            throw new TypeError(
              'Expected generateActions to be a function that takes one argument.'
            );
          this.generateActions_ = t;
        },
        enumerable: !0,
        configurable: !0
      }),
        Object.defineProperty(DefaultGameRules.prototype, 'applyAction', {
          get: function() {
            return this.applyAction_;
          },
          set: function(t) {
            if ('function' != typeof t || 2 !== t.length)
              throw new TypeError(
                'Expected applyAction to be a function that takes two arguments.'
              );
            this.applyAction_ = t;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(DefaultGameRules.prototype, 'stateIsTerminal', {
          get: function() {
            return this.stateIsTerminal_;
          },
          set: function(t) {
            if ('function' != typeof t || 1 !== t.length)
              throw new TypeError(
                'Expected stateIsTerminal to be a function that takes one argument.'
              );
            this.stateIsTerminal_ = t;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(DefaultGameRules.prototype, 'calculateReward', {
          get: function() {
            return this.calculateReward_;
          },
          set: function(t) {
            if ('function' != typeof t || 1 !== t.length)
              throw new TypeError(
                'Expected calculateReward to be a function that takes one argument.'
              );
            this.calculateReward_ = t;
          },
          enumerable: !0,
          configurable: !0
        });
    })();
    var r,
      o = (function() {
        function MCTSNode(t, e, a, r) {
          (this.mctsState_ = t),
            (this.parent_ = a),
            (this.action_ = r),
            (this.children_ = []),
            (this.possibleActionsLeftToExpand_ = e);
        }
        return (
          Object.defineProperty(MCTSNode.prototype, 'mctsState', {
            get: function() {
              return this.mctsState_;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSNode.prototype, 'possibleActionsLeftToExpand', {
            get: function() {
              return this.possibleActionsLeftToExpand_;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSNode.prototype, 'action', {
            get: function() {
              return this.action_;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSNode.prototype, 'children', {
            get: function() {
              return this.children_;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSNode.prototype, 'parent', {
            get: function() {
              return this.parent_;
            },
            enumerable: !0,
            configurable: !0
          }),
          (MCTSNode.prototype.addChild = function(t, e, a) {
            var r = new MCTSNode(t, e, this, a);
            return this.children_.push(r), r;
          }),
          (MCTSNode.prototype.isNotFullyExpanded = function() {
            return this.possibleActionsLeftToExpand_.length > 0;
          }),
          MCTSNode
        );
      })(),
      n = (function() {
        function MCTSState(t) {
          (this.state_ = t), (this.reward_ = 0), (this.visits_ = 0);
        }
        return (
          Object.defineProperty(MCTSState.prototype, 'reward', {
            get: function() {
              return this.reward_;
            },
            set: function(t) {
              this.reward_ = t;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSState.prototype, 'visits', {
            get: function() {
              return this.visits_;
            },
            set: function(t) {
              this.visits_ = t;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(MCTSState.prototype, 'state', {
            get: function() {
              return this.state_;
            },
            enumerable: !0,
            configurable: !0
          }),
          MCTSState
        );
      })();
    try {
      r =
        window.performance && window.performance.now && window.performance.timing
          ? function() {
              return window.performance.now();
            }
          : Date.now;
    } catch (t) {
      r = Date.now;
    }
    var i = function(t) {
        var e,
          a,
          r = ((e = 0),
          (a = t.length - 1),
          (e = Math.ceil(e)),
          (a = Math.floor(a)),
          Math.floor(Math.random() * (a - e + 1)) + e);
        return t.splice(r, 1)[0];
      },
      c = (function() {
        function DefaultMCTSFacade(t, e, a, r, o, n, i, c, s) {
          (this.select_ = t),
            (this.expand_ = e),
            (this.simulate_ = a),
            (this.backPropagate_ = r),
            (this.bestChild_ = o),
            (this.generateActions_ = n),
            (this.dataStore_ = i),
            (this.duration_ = c),
            (this.explorationParam_ = s);
        }
        return (
          (DefaultMCTSFacade.prototype.getAction = function(t, e) {
            var a,
              o = this,
              n = this.createRootNode_(t);
            return (
              ((a = e || this.duration_),
              {
                milliseconds: function(t) {
                  for (var e = r(); r() - e < a; ) t();
                },
                seconds: function(t) {
                  for (var e = r(), o = 1e3 * a; r() - e < o; ) t();
                },
                turns: function(t) {
                  for (; a > 0; ) t(), a--;
                }
              }).milliseconds(function() {
                var t = o.select_.run(n),
                  e = o.simulate_.run(t.mctsState.state);
                o.backPropagate_.run(t, e);
              }),
              this.bestChild_.run(n, !0).action
            );
          }),
          (DefaultMCTSFacade.prototype.createRootNode_ = function(t) {
            var e = this.dataStore_.get(t);
            return (
              e || ((e = new n(t)), this.dataStore_.set(t, e)), new o(e, this.generateActions_(t))
            );
          }),
          DefaultMCTSFacade
        );
      })(),
      s = (function() {
        function TranspositionTable(t) {
          this.data_ = t;
        }
        return (
          (TranspositionTable.prototype.get = function(t) {
            var e = JSON.stringify(t);
            return this.data_.get(e);
          }),
          (TranspositionTable.prototype.set = function(t, e) {
            var a = JSON.stringify(t);
            return this.data_.set(a, e), this;
          }),
          TranspositionTable
        );
      })(),
      l = (function() {
        function HashTable(t) {
          (this.bucketCount_ = t), (this.buckets_ = []);
          for (var e = 0; e < this.bucketCount_; e++) this.buckets_.push(new Map());
        }
        return (
          (HashTable.prototype.hashFunction_ = function(t) {
            var e = 0;
            if (0 === t.length) return e;
            for (var a = 0; a < t.length; a++) (e = (e << 5) - e), (e += t.charCodeAt(a)), (e &= e);
            return Math.abs(e);
          }),
          (HashTable.prototype.getBucketIndex_ = function(t) {
            return this.hashFunction_(t) % this.bucketCount_;
          }),
          (HashTable.prototype.getBucket_ = function(t) {
            return this.buckets_[this.getBucketIndex_(t)];
          }),
          (HashTable.prototype.set = function(t, e) {
            return this.getBucket_(t).set(t, e), this;
          }),
          (HashTable.prototype.get = function(t) {
            return this.getBucket_(t).get(t);
          }),
          HashTable
        );
      })(),
      u = (function() {
        function DefaultSelect(t, e, a, r, o) {
          (this.stateIsTerminal_ = t),
            (this.expand_ = e),
            (this.bestChild_ = a),
            (this.ucb1_ = r),
            (this.fpuParam_ = o);
        }
        return (
          (DefaultSelect.prototype.run = function(t) {
            for (; !this.stateIsTerminal_(t.mctsState.state); ) {
              var e = this.bestChild_.run(t);
              if (!e) return this.expand_.run(t);
              if (t.isNotFullyExpanded()) {
                var a = t.children.reduce(function(t, e) {
                  return t + e.mctsState.visits;
                }, 0);
                if (this.ucb1_.run(a, e.mctsState) < this.fpuParam_) return this.expand_.run(t);
              }
              t = e;
            }
            return t;
          }),
          DefaultSelect
        );
      })(),
      d = (function() {
        function DefaultExpand(t, e, a) {
          (this.applyAction_ = t), (this.generateActions_ = e), (this.dataStore_ = a);
        }
        return (
          (DefaultExpand.prototype.run = function(t) {
            var e = i(t.possibleActionsLeftToExpand),
              a = this.applyAction_(t.mctsState.state, e),
              r = this.dataStore_.get(a);
            return (
              r || ((r = new n(a)), this.dataStore_.set(a, r)),
              t.addChild(r, this.generateActions_(a), e)
            );
          }),
          DefaultExpand
        );
      })(),
      p = (function() {
        function DefaultBestChild(t) {
          this.UCB1_ = t;
        }
        return (
          (DefaultBestChild.prototype.run = function(t, e) {
            var a = this;
            if ((void 0 === e && (e = !1), t.children.length)) {
              var r = t.children.reduce(function(t, e) {
                return t + e.mctsState.visits;
              }, 0);
              return t.children.reduce(function(t, o) {
                return a.UCB1_.run(r, t.mctsState, e) > a.UCB1_.run(r, o.mctsState, e) ? t : o;
              });
            }
          }),
          DefaultBestChild
        );
      })(),
      f = (function() {
        function DefaultUCB1(t) {
          this.explorationParam_ = t;
        }
        return (
          (DefaultUCB1.prototype.run = function(t, e, a) {
            void 0 === a && (a = !1), a && (this.explorationParam_ = 0);
            var r = e.reward / e.visits,
              o = Math.sqrt(Math.log(t) / e.visits);
            return r + this.explorationParam_ * o;
          }),
          DefaultUCB1
        );
      })(),
      T = (function() {
        function DefaultSimulate(t, e, a, r) {
          (this.stateIsTerminal_ = t),
            (this.generateActions_ = e),
            (this.applyAction_ = a),
            (this.calculateReward_ = r);
        }
        return (
          (DefaultSimulate.prototype.run = function(t) {
            for (var e = t.player; !this.stateIsTerminal_(t); ) {
              var a = this.generateActions_(t),
                r = i(a);
              t = this.applyAction_(t, r);
            }
            return this.calculateReward_(t, e);
          }),
          DefaultSimulate
        );
      })(),
      b = (function() {
        function DecisiveMoveSimulate(t, e, a, r) {
          (this.stateIsTerminal_ = t),
            (this.generateActions_ = e),
            (this.applyAction_ = a),
            (this.calculateReward_ = r);
        }
        return (
          (DecisiveMoveSimulate.prototype.run = function(t) {
            for (var e = t.player; !this.stateIsTerminal_(t); ) {
              for (var a = this.generateActions_(t), r = void 0, o = 0, n = a; o < n.length; o++) {
                var c = n[o],
                  s = this.applyAction_(t, c);
                if (1 === this.calculateReward_(s, s.player)) {
                  r = c;
                  break;
                }
              }
              r || (r = i(a)), (t = this.applyAction_(t, r));
            }
            return this.calculateReward_(t, e);
          }),
          DecisiveMoveSimulate
        );
      })(),
      h = (function() {
        function AntiDecisiveMoveSimulate(t, e, a, r) {
          (this.stateIsTerminal_ = t),
            (this.generateActions_ = e),
            (this.applyAction_ = a),
            (this.calculateReward_ = r);
        }
        return (
          (AntiDecisiveMoveSimulate.prototype.run = function(t) {
            for (var e = t.player; !this.stateIsTerminal_(t); ) {
              for (var a = this.generateActions_(t), r = void 0, o = 0, n = a; o < n.length; o++) {
                var c = n[o],
                  s = this.applyAction_(t, c);
                if (1 === this.calculateReward_(s, s.player)) {
                  r = c;
                  break;
                }
              }
              if (!r)
                for (var l = 0, u = a; l < u.length; l++) {
                  c = u[l];
                  t.player *= -1;
                  s = this.applyAction_(t, c);
                  if (((t.player *= -1), 1 === this.calculateReward_(s, s.player))) {
                    r = c;
                    break;
                  }
                }
              r || (r = i(a)), (t = this.applyAction_(t, r));
            }
            return this.calculateReward_(t, e);
          }),
          AntiDecisiveMoveSimulate
        );
      })(),
      _ = (function() {
        function DefaultBackPropagate() {}
        return (
          (DefaultBackPropagate.prototype.run = function(t, e) {
            for (; t; ) t.mctsState.visits++, (t.mctsState.reward += e), (e *= -1), (t = t.parent);
          }),
          DefaultBackPropagate
        );
      })(),
      m = (function() {
        function Controller(t, e) {
          (this.duration_ = e.duration),
            (this.explorationParam_ = e.explorationParam || 1.414),
            (this.fpuParam_ = e.fpuParam || 1 / 0),
            (this.transpoTable_ = e.transpoTable || 1e5),
            (this.simulate_ = e.simulate || []),
            (this.expand_ = e.expand || []),
            (this.select_ = e.select || []),
            this.init(t);
        }
        return (
          (Controller.prototype.init = function(t) {
            var e;
            e = this.transpoTable_ ? new l(this.transpoTable_) : new Map();
            var a,
              r = new s(e),
              o = new f(this.explorationParam_),
              n = new p(o),
              i = new d(t.applyAction, t.generateActions, r),
              m = new u(t.stateIsTerminal, i, n, o, this.fpuParam_);
            this.simulate_.includes('decisive') &&
              (a = new b(t.stateIsTerminal, t.generateActions, t.applyAction, t.calculateReward)),
              (a = this.simulate_.includes('anti-decisive')
                ? new h(t.stateIsTerminal, t.generateActions, t.applyAction, t.calculateReward)
                : new T(t.stateIsTerminal, t.generateActions, t.applyAction, t.calculateReward));
            var w = new _();
            this.mcts_ = new c(
              m,
              i,
              a,
              w,
              n,
              t.generateActions,
              r,
              this.duration_,
              this.explorationParam_
            );
          }),
          (Controller.prototype.getAction = function(t, e) {
            return this.mcts_.getAction(t, e);
          }),
          Controller
        );
      })(),
      w = (function() {
        function Macao(t, e) {
          this.controller_ = new m(t, e);
        }
        return (
          (Macao.prototype.getAction = function(t, e) {
            return this.controller_.getAction(t, e);
          }),
          Macao
        );
      })();
  },
  './src/main.ts': function(t, e, a) {
    'use strict';
    Object.defineProperty(e, '__esModule', {
      value: !0
    });
    const r = a('./node_modules/macao/dist/macao.es5.js'),
      o = a('./src/tic-tac-toe/ultimate.ts');
    let n = {
      board: o.uTicTacToeBoard,
      player: -1,
      previousAction: {
        bigRow: -1,
        bigCol: -1,
        smallCol: -1,
        smallRow: -1
      }
    };
    const i = new r.Macao(
      {
        generateActions: o.ticTacToeFuncs.generateActions,
        applyAction: o.ticTacToeFuncs.applyAction,
        stateIsTerminal: o.ticTacToeFuncs.stateIsTerminal,
        calculateReward: o.ticTacToeFuncs.calculateReward
      },
      {
        duration: 91
      }
    );
    let c = !0;
    for (;;) {
      const t = readline().split(' '),
        e = parseInt(t[0]),
        a = parseInt(t[1]),
        r = parseInt(readline());
      for (var s = 0; s < r; s++) {
        readline();
      }
      const l = o.convertToMove(e, a);
      -1 !== e && (n = o.ticTacToeFuncs.applyAction(n, l));
      const u = c ? i.getAction(n, 991) : i.getAction(n);
      (c = !1), (n = o.ticTacToeFuncs.applyAction(n, u));
      const d = o.convertFromMove(u);
      print(`${d.row} ${d.col}`);
    }
  },
  './src/tic-tac-toe/ultimate.ts': function(t, e, a) {
    'use strict';
    function possibleMovesUTicTacToe(t) {
      const e = [];
      if (-1 !== t.previousAction.bigRow) {
        const a = t.previousAction.smallRow,
          r = t.previousAction.smallCol,
          o = {
            board: t.board[a][r]
          };
        if (!stateIsTerminalTicTacToe(o))
          return (
            o.board.forEach((t, o) => {
              t.forEach((t, n) => {
                0 === t &&
                  e.push({
                    bigRow: a,
                    bigCol: r,
                    smallRow: o,
                    smallCol: n
                  });
              });
            }),
            e
          );
      }
      return (
        t.board.forEach((t, a) => {
          t.forEach((t, r) => {
            const o = {
              board: t
            };
            stateIsTerminalTicTacToe(o) ||
              o.board.forEach((t, o) => {
                t.forEach((t, n) => {
                  0 === t &&
                    e.push({
                      bigRow: a,
                      bigCol: r,
                      smallRow: o,
                      smallCol: n
                    });
                });
              });
          });
        }),
        e
      );
    }
    function playMoveUTicTacToe(t, e) {
      const a = JSON.stringify(t.board),
        r = JSON.parse(a);
      return (
        (r[e.bigRow][e.bigCol][e.smallRow][e.smallCol] = -1 * t.player),
        {
          board: r,
          player: -1 * t.player,
          previousAction: e
        }
      );
    }
    function stateIsTerminalTicTacToe(t) {
      for (let e = 0; e < 3; e++) {
        if (
          t.board[e][0] === t.board[e][1] &&
          t.board[e][1] === t.board[e][2] &&
          0 !== t.board[e][0] &&
          'D' !== t.board[e][0]
        )
          return !0;
        if (
          t.board[0][e] === t.board[1][e] &&
          t.board[1][e] === t.board[2][e] &&
          0 !== t.board[0][e] &&
          'D' !== t.board[0][e]
        )
          return !0;
      }
      if (
        t.board[0][0] === t.board[1][1] &&
        t.board[1][1] === t.board[2][2] &&
        0 !== t.board[0][0] &&
        'D' !== t.board[0][0]
      )
        return !0;
      if (
        t.board[0][2] === t.board[1][1] &&
        t.board[1][1] === t.board[2][0] &&
        0 !== t.board[0][2] &&
        'D' !== t.board[0][2]
      )
        return !0;
      return !!t.board.reduce((t, e) => t.concat(e)).every(t => 0 !== t);
    }
    function stateIsTerminalUTicTacToe(t) {
      let e = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      return (
        t.board.forEach((t, a) => {
          t.forEach((t, r) => {
            const o = {
              board: t
            };
            if (stateIsTerminalTicTacToe(o)) {
              const t = calculateRewardTicTacToe(o, 1);
              e[a][r] = 0 === t ? 'D' : t;
            }
          });
        }),
        stateIsTerminalTicTacToe({
          board: e
        })
      );
    }
    function calculateRewardTicTacToe(t, e) {
      for (let a = 0; a < 3; a++) {
        if (
          t.board[a][0] === t.board[a][1] &&
          t.board[a][1] === t.board[a][2] &&
          0 !== t.board[a][0]
        )
          return t.board[a][0] === e ? 1 : -1;
        if (
          t.board[0][a] === t.board[1][a] &&
          t.board[1][a] === t.board[2][a] &&
          0 !== t.board[0][a]
        )
          return t.board[0][a] === e ? 1 : -1;
      }
      return t.board[0][0] === t.board[1][1] &&
        t.board[1][1] === t.board[2][2] &&
        0 !== t.board[0][0]
        ? t.board[0][0] === e
          ? 1
          : -1
        : t.board[0][2] === t.board[1][1] && t.board[1][1] === t.board[2][0] && 0 !== t.board[0][2]
        ? t.board[0][2] === e
          ? 1
          : -1
        : 0;
    }
    function calculateRewardUTicTacToe(t, e) {
      for (let a = 0; a < 3; a++) {
        if (
          calculateRewardTicTacToe(
            {
              board: t.board[a][0]
            },
            e
          ) ===
            calculateRewardTicTacToe(
              {
                board: t.board[a][1]
              },
              e
            ) &&
          calculateRewardTicTacToe(
            {
              board: t.board[a][1]
            },
            e
          ) ===
            calculateRewardTicTacToe(
              {
                board: t.board[a][2]
              },
              e
            )
        )
          return 1 ===
            calculateRewardTicTacToe(
              {
                board: t.board[a][0]
              },
              e
            )
            ? 1
            : -1;
        if (
          calculateRewardTicTacToe(
            {
              board: t.board[0][a]
            },
            e
          ) ===
            calculateRewardTicTacToe(
              {
                board: t.board[1][a]
              },
              e
            ) &&
          calculateRewardTicTacToe(
            {
              board: t.board[1][a]
            },
            e
          ) ===
            calculateRewardTicTacToe(
              {
                board: t.board[2][a]
              },
              e
            )
        )
          return 1 ===
            calculateRewardTicTacToe(
              {
                board: t.board[0][a]
              },
              e
            )
            ? 1
            : -1;
      }
      if (
        calculateRewardTicTacToe(
          {
            board: t.board[0][0]
          },
          e
        ) ===
          calculateRewardTicTacToe(
            {
              board: t.board[1][1]
            },
            e
          ) &&
        calculateRewardTicTacToe(
          {
            board: t.board[1][1]
          },
          e
        ) ===
          calculateRewardTicTacToe(
            {
              board: t.board[2][2]
            },
            e
          )
      )
        return 1 ===
          calculateRewardTicTacToe(
            {
              board: t.board[0][0]
            },
            e
          )
          ? 1
          : -1;
      if (
        calculateRewardTicTacToe(
          {
            board: t.board[0][2]
          },
          e
        ) ===
          calculateRewardTicTacToe(
            {
              board: t.board[1][1]
            },
            e
          ) &&
        calculateRewardTicTacToe(
          {
            board: t.board[1][1]
          },
          e
        ) ===
          calculateRewardTicTacToe(
            {
              board: t.board[2][0]
            },
            e
          )
      )
        return 1 ===
          calculateRewardTicTacToe(
            {
              board: t.board[0][2]
            },
            e
          )
          ? 1
          : -1;
      let a = 0,
        r = 0;
      for (const o of t.board)
        for (const t of o) {
          switch (
            calculateRewardTicTacToe(
              {
                board: t
              },
              e
            )
          ) {
            case 1:
              a++;
              break;

            case -1:
              r++;
          }
        }
      return a > r ? 1 : r > a ? -1 : 0;
    }
    Object.defineProperty(e, '__esModule', {
      value: !0
    }),
      (e.convertToMove = function convertToMove(t, e) {
        return {
          bigRow: Math.floor(t / 3),
          bigCol: Math.floor(e / 3),
          smallRow: Math.floor(t % 3),
          smallCol: Math.floor(e % 3)
        };
      }),
      (e.convertFromMove = function convertFromMove(t) {
        return {
          row: Math.floor(3 * t.bigRow) + Math.floor(t.smallRow % 3),
          col: Math.floor(3 * t.bigCol) + Math.floor(t.smallCol % 3)
        };
      }),
      (e.uTicTacToeBoard = [
        [
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ],
        [
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ],
        [
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ]
      ]),
      (e.possibleMovesUTicTacToe = possibleMovesUTicTacToe),
      (e.playMoveUTicTacToe = playMoveUTicTacToe),
      (e.stateIsTerminalTicTacToe = stateIsTerminalTicTacToe),
      (e.stateIsTerminalUTicTacToe = stateIsTerminalUTicTacToe),
      (e.calculateRewardTicTacToe = calculateRewardTicTacToe),
      (e.calculateRewardUTicTacToe = calculateRewardUTicTacToe),
      (e.ticTacToeFuncs = {
        generateActions: possibleMovesUTicTacToe,
        applyAction: playMoveUTicTacToe,
        stateIsTerminal: stateIsTerminalUTicTacToe,
        calculateReward: calculateRewardUTicTacToe
      });
  }
});
