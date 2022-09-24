<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subunidade extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'subunidades';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *, 'comandante', 'subcomandante'
     * @var array
     */
    protected $with = ['cidade', 'unidade'];

    public function cidade()
    {
        return $this->belongsTo(Cidade::class);
    }

     public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

     public function comandante()
    {
        return $this->belongsTo(User::class,'comandante_id');
    }

    public function subcomandante()
    {
        return $this->belongsTo(User::class,'subcomandante_id');
    }
}
