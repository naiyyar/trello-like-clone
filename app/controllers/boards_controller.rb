class BoardsController < ApplicationController
  before_action :set_board, only: %i[ show edit update destroy ]

  # GET /boards or /boards.json
  def index
    @boards = current_user.boards.includes(:lists).rank(:row_order)
    @lists = current_board.lists.includes(:tasks).rank(:row_order) if current_board
  end

  # GET /boards/1 or /boards/1.json
  def show
    @lists = @board.lists
    @boards = current_user.boards.includes(:lists).rank(:row_order)
    switch_board(@board)

    respond_to do |format|
      format.turbo_stream
    end
  end

  # GET /boards/new
  def new
    @board = Board.new
  end

  # GET /boards/1/edit
  def edit
  end

  # POST /boards or /boards.json
  def create
    @board = Board.new(board_params)
    @board.user = current_user

    respond_to do |format|
      if @board.save
        switch_board(@board)
        format.turbo_stream
        format.html { redirect_to @board, notice: "Board was successfully created." }
        format.json { render :show, status: :created, location: @board }
      else
        format.turbo_stream
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /boards/1 or /boards/1.json
  def update
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to @board, notice: "Board was successfully updated." }
        format.json { render :show, status: :ok, location: @board }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boards/1 or /boards/1.json
  def destroy
    @board.destroy!

    respond_to do |format|
      format.html { redirect_to boards_path, status: :see_other, notice: "Board was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = Board.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def board_params
      params.expect(board: [ :name, :user_id, :background ])
    end
end
